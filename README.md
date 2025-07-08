# ttyd Web Client with Overlay Keyboard

Customized ttyd web client with on-screen keyboard overlay support.

Forked from [tsl0922/ttyd](https://github.com/tsl0922/ttyd)

## Demo
![ttyd Overlay Keyboard Demo](https://raw.githubusercontent.com/ar90n/ttyd-overlay-keys-html/assets/demo.gif)

### Usage Example
```bash
# Download the latest index.html from releases, then:
ttyd --index index.html claude
```
Access your terminal at http://localhost:7681 with mobile-optimized overlay keyboard!

## Features
- Single HTML file output for embedding in ttyd binary
- Overlay keyboard for Shift+Tab, Esc, and arrow keys
- Built with Preact + TypeScript + xterm.js

## Build
```bash
npm install
npm run build
```

## Download
Get the latest release from [GitHub Releases](https://github.com/ar90n/ttyd-overlay-keys-html/releases)