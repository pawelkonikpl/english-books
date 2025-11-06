#!/bin/bash

# Script to fix EMFILE: too many open files error
# This increases the system's file descriptor limits

echo "Fixing file watcher limits..."

# Check current limits
echo "Current soft limit: $(ulimit -n)"
echo "Current hard limit: $(ulimit -Hn)"

# For macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo ""
    echo "Detected macOS - applying fixes..."

    # Increase the limit for the current session
    ulimit -n 65536
    ulimit -u 2048

    echo "✓ Increased file descriptor limit to 65536 for current session"
    echo ""
    echo "To make this permanent on macOS:"
    echo "1. Create /Library/LaunchDaemons/limit.maxfiles.plist with:"
    echo '   <?xml version="1.0" encoding="UTF-8"?>'
    echo '   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">'
    echo '   <plist version="1.0">'
    echo '     <dict>'
    echo '       <key>Label</key>'
    echo '       <string>limit.maxfiles</string>'
    echo '       <key>ProgramArguments</key>'
    echo '       <array>'
    echo '         <string>launchctl</string>'
    echo '         <string>limit</string>'
    echo '         <string>maxfiles</string>'
    echo '         <string>65536</string>'
    echo '         <string>200000</string>'
    echo '       </array>'
    echo '       <key>RunAtLoad</key>'
    echo '       <true/>'
    echo '       <key>ServiceIPC</key>'
    echo '       <false/>'
    echo '     </dict>'
    echo '   </plist>'
    echo ""
    echo "2. Run: sudo launchctl load -w /Library/LaunchDaemons/limit.maxfiles.plist"
    echo "3. Restart your computer"

# For Linux
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo ""
    echo "Detected Linux - applying fixes..."

    # Increase the limit for the current session
    ulimit -n 65536

    echo "✓ Increased file descriptor limit to 65536 for current session"
    echo ""
    echo "To make this permanent on Linux:"
    echo "1. Edit /etc/security/limits.conf and add:"
    echo "   * soft nofile 65536"
    echo "   * hard nofile 200000"
    echo ""
    echo "2. Edit /etc/sysctl.conf and add:"
    echo "   fs.inotify.max_user_watches=524288"
    echo ""
    echo "3. Apply the sysctl changes:"
    echo "   sudo sysctl -p"
    echo ""
    echo "4. Log out and log back in"
fi

# Check if watchman is installed
if command -v watchman &> /dev/null; then
    echo ""
    echo "✓ Watchman is installed"
    echo "  Stopping and clearing watchman cache..."
    watchman shutdown-server
    echo "  ✓ Watchman cache cleared"
else
    echo ""
    echo "⚠ Watchman is not installed"
    echo "  Installing Watchman can significantly improve file watching performance"
    echo ""
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "  Install with: brew install watchman"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "  Install with: sudo apt-get install watchman"
        echo "  Or follow: https://facebook.github.io/watchman/docs/install.html"
    fi
fi

echo ""
echo "New soft limit: $(ulimit -n)"
echo ""
echo "Done! You can now run 'npm run start' again."
echo "Note: These changes are temporary for this terminal session."
echo "Follow the instructions above to make them permanent."
