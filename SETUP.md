# Commonplace: install it on your phone (about 10 minutes)

You already did the hard part for Marginalia. Commonplace uses the **same Google key**, so there is nothing new to do in Google's console as long as you host it on the **same GitHub account**.

---

## Part 1. Put the app online

1. Go to github.com and sign in (the same account you used for Marginalia).
2. Click **+** at the top right, then **New repository**. Name it `commonplace`. Leave it **Public**. Click **Create repository**.
3. Click **uploading an existing file**.
4. Open the unzipped `commonplace-app` folder on your computer. Select ALL the files inside (there are no folders) and drag them into the GitHub page. They are `index.html`, `config.js`, `sw.js`, `manifest.webmanifest` and four `.png` icon files.
5. Click **Commit changes**.
6. Go to **Settings**, then **Pages**. Set Source to **Deploy from a branch**, Branch **main**, folder **/ (root)**, and click **Save**.
7. Wait a minute. Your link will be `https://YOURNAME.github.io/commonplace/`

## Part 2. Add your Google key

1. In your **marginalia** repository on GitHub, open `config.js` and copy your Client ID (it looks like `123456789-abc.apps.googleusercontent.com`).
2. In your new **commonplace** repository, open `config.js`, click the pencil icon, and replace `PASTE_YOUR_CLIENT_ID_HERE` with that same Client ID. Keep the quote marks. Click **Commit changes**.

No change is needed in Google's console, because both apps live at `https://YOURNAME.github.io`.
(If you host Commonplace somewhere else, add that address under Authorized JavaScript origins in Google's console, the same way you did for Marginalia.)

## Part 3. One small fix for Marginalia (recommended)

Both apps share the same website address, which means they share the browser's offline storage. Marginalia's old offline file could clear Commonplace's saved copy. The fix is one file:

1. In your **marginalia** repository, click **Add file > Upload files**.
2. Drag in the `sw.js` from **marginalia-offline-fix.zip** and click **Commit changes**.

## Part 4. Use it

1. Open your link in **Safari** on your iPhone. Tap Share, then **Add to Home Screen**.
2. Open Commonplace from your home screen. Tap the **gear** at the top right of the Journal, then **Connect Google Drive**. Choose your account and allow it.
3. The dot on the gear turns green when everything is saved to your Drive.
4. On any other device, open the same link and connect once.

### Bring over what you wrote in the prototype
In the prototype, tap the gear, then **Copy all my data**. In the installed app tap the gear, then **Restore**, paste, and tap **Restore pasted text**.

### Bring in your Marginalia highlights
Gear, then **Bring in highlights from Marginalia**. Choose **From your Google Drive** (reads them straight from the files Marginalia saved there), or **From Marginalia on this device**, or a backup file. Your Marginalia library is never changed.

---

## How it behaves
- **Saved on your device first**, then copied to a private folder in your Google Drive. You can write with no signal. Changes upload when you are back online.
- **Two devices** merge by newest edit. If you edit the very same entry on two devices, the later edit wins.
- **Sign-in lasts about an hour.** The app reconnects by itself when you open it. If your browser blocks that, the gear dot turns red: open Settings and tap **Reconnect Google Drive**. Nothing is lost.
- **Back up anyway.** Gear, then **Back up my data** saves a file that does not depend on Google.
- **Hidden folder.** The files sit in the same hidden app folder as Marginalia's, with names starting `cp-`. Marginalia ignores them and Commonplace ignores Marginalia's.
- **Updating the app.** On GitHub choose **Add file > Upload files**, drag in the new files, and commit. Never replace `config.js`, because it holds your Google key. Then close the app and open it twice.

## If something goes wrong
| What you see | What to do |
|---|---|
| Settings say "Add your Google client ID" | `config.js` was not saved with your key. Check it, wait a minute, refresh twice. |
| Google says **origin_mismatch** | The site address is not the same as the one in Google's console. It must be `https://YOURNAME.github.io` exactly. |
| The dot is red | Open Settings. If it says sign-in expired, tap **Reconnect**. If it says Drive is full, free up space and tap **Sync now**. |
| Anything else | Gear, **Diagnostics**, **Copy report**, and send me the report. |
