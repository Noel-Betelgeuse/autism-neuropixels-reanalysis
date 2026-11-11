# Automatic Drive → GitHub backup

The working source is the `Jan/Reanalysis/Our_Analysis` folder on Google Drive. The Apps Script `drive_to_github.gs` copies supported small files into `Our_Analysis/` in this private repository.

This is **one-way, periodic backup**, not live two-way synchronization. It does not delete GitHub files, pull GitHub changes back into Drive, or save Colab runtime memory. Keep editing only Drive notebooks.

## Setup (one time)

1. Visit https://github.com/settings/personal-access-tokens and create a **fine-grained personal access token**:
   - Resource owner: account `Noel-Betelgeuse`.
   - Repository access: **Only selected repositories**, choose `autism-neuropixels-reanalysis`.
   - Repository permissions: **Contents: Read and write**. Leave other permissions at their defaults/minimum.
   - Choose a reasonable expiration and renew it before expiry.
2. Visit https://script.google.com and create a standalone Apps Script project named `Reanalysis GitHub Backup`.
3. Paste the complete source from `Our_Analysis/00_documentation/drive_to_github.gs` into `Code.gs` (replace the default content), then save.
4. Under **Project Settings → Script properties**, add:
   - `GITHUB_TOKEN` = your personal fine-grained token (never paste into source, Colab cells, chat, or GitHub).
   - `DRY_RUN` = `true`.
5. From the function selector run `syncToGithub` manually. Grant Google Drive read access and external network access when prompted. Check **Executions → Logs**: expect `DRY_RUN` with filenames and zero writes.
6. Set `DRY_RUN` to `false`. Run `syncToGithub` again. Check **Executions** for `COMPLETED` and `errors:0`, and verify files/commits in GitHub.
7. Run `install15MinuteTrigger` **once**. It replaces preexisting triggers for `syncToGithub` in this Apps Script project. From then on, it runs approximately every 15 minutes, including when the laptop is powered off.

To stop automatic backup, run `removeSyncTriggers`. To rotate credentials, replace `GITHUB_TOKEN` in Script properties; do not edit source code.

## Safety / limitations

- The script reads Google Drive folder ID `1PFzezO-ks7CkHDJeY-Ah5Mb6M4nEX5sX` and recursively copies supported files (.ipynb, .py, .csv, .md, .txt, .json, .yaml, .yml, .gs) smaller than **2 MiB**. Larger source data, binary formats and most native Workspace files are skipped.
- It checks Git blob SHA-1 before writing and commits only changed/new content. Existing repository content is updated only when Drive has differing bytes; Drive remains authoritative.
- It never deletes existing GitHub files. Manual edits to mirrored GitHub files can be overwritten by the next Drive sync. Do not edit mirrored notebooks directly on GitHub.
- Native Colab notebooks may be stored as Google Drive type `application/vnd.google.colaboratory`. The script validates notebook JSON before upload. If your Drive account returns an unexportable blob, the script reports an error and skips the file; inspect the execution log rather than assuming backup succeeded.
- A Drive notebook is autosaved by Colab only after the editor successfully saves it. The script backs up the most recently saved Drive version, not unsaved typing or running memory.
- No credentials are embedded in source. Access to the Apps Script project should be restricted because its Script properties contain a token.
- A scheduled job is subject to Apps Script quota/availability and may fail. Check **Executions** periodically.

Documentation: https://developers.google.com/apps-script/guides/triggers/installable and https://docs.github.com/en/rest/repos/contents.
