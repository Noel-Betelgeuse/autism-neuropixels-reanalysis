/**
 * One-way Google Drive -> GitHub synchronization for the autism reanalysis.
 *
 * Source: Jan/Reanalysis/Our_Analysis (Google Drive)
 * Target: Our_Analysis/ (GitHub repository)
 *
 * Configure GITHUB_TOKEN and DRY_RUN in Apps Script Project Settings
 * -> Script properties. Never paste tokens into this source file.
 *
 * No deletions are performed. GitHub changes do not sync back to Drive.
 */

const SYNC_CONFIG = Object.freeze({
  sourceFolderId: '1PFzezO-ks7CkHDJeY-Ah5Mb6M4nEX5sX',
  repo: 'Noel-Betelgeuse/autism-neuropixels-reanalysis',
  branch: 'main',
  githubPrefix: 'Our_Analysis',
  maxFileBytes: 2 * 1024 * 1024,
  extensions: ['ipynb', 'py', 'csv', 'md', 'txt', 'json', 'yaml', 'yml', 'gs'],
  excludedNames: ['.DS_Store', 'Thumbs.db'],
  excludedFolders: ['.git', '__pycache__', '.ipynb_checkpoints', 'node_modules']
});

function syncToGithub() {
  const properties = PropertiesService.getScriptProperties();
  const token = properties.getProperty('GITHUB_TOKEN');
  const dryRun = properties.getProperty('DRY_RUN') !== 'false';

  if (!dryRun && !token) {
    throw new Error('GITHUB_TOKEN is missing from Script properties.');
  }

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) {
    console.log('Another synchronization is running. Skipping.');
    return;
  }

  const result = { scanned: 0, uploaded: 0, unchanged: 0, skipped: 0, errors: 0 };
  try {
    const root = DriveApp.getFolderById(SYNC_CONFIG.sourceFolderId);
    visitFolder_(root, SYNC_CONFIG.githubPrefix, token, dryRun, result);
    console.log(JSON.stringify({
      status: dryRun ? 'DRY_RUN' : 'COMPLETED',
      ...result
    }));
  } finally {
    lock.releaseLock();
  }
}

function visitFolder_(folder, repoPath, token, dryRun, result) {
  const files = folder.getFiles();

  while (files.hasNext()) {
    const file = files.next();
    const name = file.getName();
    const path = repoPath + '/' + name;
    const extension = name.includes('.') ? name.split('.').pop().toLowerCase() : '';

    if (SYNC_CONFIG.excludedNames.includes(name) ||
        !SYNC_CONFIG.extensions.includes(extension)) {
      result.skipped++;
      continue;
    }

    // Files in Drive may include native Google Docs, Sheets, and Slides.
    // They are not safely representable as text source files without export.
    const mime = file.getMimeType();
    if (mime.startsWith('application/vnd.google-apps.') &&
        mime !== 'application/vnd.google.colaboratory') {
      result.skipped++;
      console.log('SKIP native Google Workspace file: ' + path);
      continue;
    }

    // Always read bytes: native Colab file.getSize() may report zero.
    const bytes = file.getBlob().getBytes();
    if (bytes.length > SYNC_CONFIG.maxFileBytes) {
      result.skipped++;
      console.log('SKIP oversized file: ' + path + ' (' + bytes.length + ' bytes)');
      continue;
    }

    // Avoid committing corrupt or unsupported notebook exports.
    if (extension === 'ipynb') {
      try {
        const notebook = JSON.parse(file.getBlob().getDataAsString('UTF-8'));
        if (!Array.isArray(notebook.cells)) throw new Error('Missing cells');
      } catch (error) {
        result.errors++;
        console.error('Invalid notebook, not committed: ' + path + ': ' + error);
        continue;
      }
    }

    result.scanned++;

    // In dry-run mode, no Github token or network access is required.
    if (dryRun) {
      console.log('DRY RUN would inspect: ' + path);
      continue;
    }

    try {
      const remote = githubGet_(path, token);
      const localSha = gitBlobSha_(bytes);
      if (remote && remote.sha === localSha) {
        result.unchanged++;
        continue;
      }

      const payload = {
        message: 'Sync ' + path + ' from Google Drive',
        content: Utilities.base64Encode(bytes),
        branch: SYNC_CONFIG.branch
      };
      if (remote) payload.sha = remote.sha;

      const endpoint = githubContentsUrl_(path);
      const response = UrlFetchApp.fetch(endpoint, {
        method: 'put',
        contentType: 'application/json',
        headers: githubHeaders_(token),
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      });
      const status = response.getResponseCode();
      if (status !== 200 && status !== 201) {
        throw new Error('GitHub PUT status ' + status + ': ' +
          response.getContentText().slice(0, 500));
      }
      result.uploaded++;
      console.log('SYNCED ' + path);
    } catch (error) {
      result.errors++;
      console.error('SYNC FAILED ' + path + ': ' + error);
    }
  }

  const folders = folder.getFolders();
  while (folders.hasNext()) {
    const child = folders.next();
    const childName = child.getName();
    if (SYNC_CONFIG.excludedFolders.includes(childName)) continue;
    visitFolder_(child, repoPath + '/' + childName, token, dryRun, result);
  }
}

function githubGet_(path, token) {
  const response = UrlFetchApp.fetch(githubContentsUrl_(path), {
    method: 'get',
    headers: githubHeaders_(token),
    muteHttpExceptions: true
  });

  const code = response.getResponseCode();
  if (code === 404) return null;
  if (code !== 200) {
    throw new Error('GitHub GET status ' + code + ': ' +
      response.getContentText().slice(0, 500));
  }
  const data = JSON.parse(response.getContentText());
  if (!data || data.type !== 'file' || !data.sha) {
    throw new Error('Unexpected GitHub contents response for ' + path);
  }
  return data;
}

function githubContentsUrl_(path) {
  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  return 'https://api.github.com/repos/' + SYNC_CONFIG.repo +
    '/contents/' + encodedPath + '?ref=' + encodeURIComponent(SYNC_CONFIG.branch);
}

function githubHeaders_(token) {
  return {
    Authorization: 'Bearer ' + token,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };
}

/** Git blob SHA-1 = SHA1("blob " + byteLength + NUL + rawBytes). */
function gitBlobSha_(bytes) {
  const prefix = Utilities.newBlob('blob ' + bytes.length + '\u0000').getBytes();
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_1, prefix.concat(bytes)
  );
  return digest.map(b => ('0' + (b & 255).toString(16)).slice(-2)).join('');
}

/** Run once after a successful manual sync and DRY_RUN=false. */
function install15MinuteTrigger() {
  const existing = ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'syncToGithub');
  existing.forEach(ScriptApp.deleteTrigger);
  ScriptApp.newTrigger('syncToGithub').timeBased().everyMinutes(15).create();
  console.log('Installed one 15-minute sync trigger.');
}

/** Optional: disable scheduled synchronization without deleting project files. */
function removeSyncTriggers() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'syncToGithub')
    .forEach(ScriptApp.deleteTrigger);
  console.log('Synchronization triggers removed.');
}
