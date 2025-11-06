# Fix for EMFILE: too many open files Error

## Problem
When running `npm run start`, you may encounter this error:
```
Error: EMFILE: too many open files, watch
```

This happens when the Metro bundler's file watcher tries to monitor too many files and exceeds your system's limit on open file descriptors.

## Solutions Applied

### 1. Updated Metro Configuration (`metro.config.js`)
- Removed restrictive `watchFolders` limitation
- Added comprehensive blocklist to exclude unnecessary directories:
  - Build directories (`build/`, `dist/`)
  - Android/iOS build folders and dependencies
  - Cache directories
  - IDE configuration folders
  - Parent monorepo directories to prevent watching the entire repo
- Added `maxWorkers: 2` to limit resource usage
- Enabled watcher health checks

### 2. Updated Watchman Configuration (`.watchmanconfig`)
- Added more directories to ignore:
  - Build outputs
  - IDE configurations
  - Platform-specific build artifacts
  - Parent monorepo directories

### 3. Created Helper Script (`fix-file-watchers.sh`)
Run this script to increase your system's file descriptor limits:
```bash
./fix-file-watchers.sh
```

## Quick Fix (Temporary)

For an immediate fix that lasts for your current terminal session:

### On Linux:
```bash
ulimit -n 65536
cd /home/user/english-books/frontend
npm run start
```

### On macOS:
```bash
ulimit -n 65536
ulimit -u 2048
cd /home/user/english-books/frontend
npm run start
```

## Permanent Fix

### On Linux:

1. Edit `/etc/security/limits.conf`:
   ```bash
   sudo nano /etc/security/limits.conf
   ```
   Add these lines:
   ```
   * soft nofile 65536
   * hard nofile 200000
   ```

2. Edit `/etc/sysctl.conf`:
   ```bash
   sudo nano /etc/sysctl.conf
   ```
   Add this line:
   ```
   fs.inotify.max_user_watches=524288
   ```

3. Apply the changes:
   ```bash
   sudo sysctl -p
   ```

4. Log out and log back in

### On macOS:

1. Create `/Library/LaunchDaemons/limit.maxfiles.plist`:
   ```bash
   sudo nano /Library/LaunchDaemons/limit.maxfiles.plist
   ```

2. Add this content:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
     <dict>
       <key>Label</key>
       <string>limit.maxfiles</string>
       <key>ProgramArguments</key>
       <array>
         <string>launchctl</string>
         <string>limit</string>
         <string>maxfiles</string>
         <string>65536</string>
         <string>200000</string>
       </array>
       <key>RunAtLoad</key>
       <true/>
       <key>ServiceIPC</key>
       <false/>
     </dict>
   </plist>
   ```

3. Load the configuration:
   ```bash
   sudo launchctl load -w /Library/LaunchDaemons/limit.maxfiles.plist
   ```

4. Restart your computer

## Install Watchman (Recommended)

Watchman is Facebook's file watching service, which is much more efficient than the default file watcher.

### On macOS:
```bash
brew install watchman
```

### On Linux:
```bash
sudo apt-get install watchman
```
Or follow the official guide: https://facebook.github.io/watchman/docs/install.html

After installing Watchman, clear its cache:
```bash
watchman shutdown-server
```

## Verify the Fix

1. Check your new file descriptor limit:
   ```bash
   ulimit -n
   ```
   Should show at least 65536

2. Start Metro bundler:
   ```bash
   npm run start
   ```

3. The error should no longer occur!

## Additional Notes

- The `--max-workers=2` flag in the start script (package.json) helps limit Metro's resource usage
- The configuration changes prevent Metro from watching unnecessary files in the monorepo structure
- If you still encounter issues, try clearing Metro's cache:
  ```bash
  npm start -- --reset-cache
  ```

## References
- [React Native Docs - Upgrading](https://reactnative.dev/docs/upgrading)
- [Metro Bundler Configuration](https://facebook.github.io/metro/docs/configuration)
- [Watchman Documentation](https://facebook.github.io/watchman/)
