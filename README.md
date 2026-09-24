# Butterchurn iOS

A mobile-friendly Butterchurn (Milkdrop) visualizer that works on iOS Safari.

The [official butterchurnviz.com](https://butterchurnviz.com) uses the deprecated `navigator.getUserMedia` API which doesn't work on iOS. This version uses the modern `navigator.mediaDevices.getUserMedia()` API.

## Demo

[Live Demo](https://pxl-pshr.github.io/butterchurn-ios/)

## Features

- Works on iOS Safari and iPad
- Microphone input for live audio visualization
- Audio file playback (streamed, with play/pause) when a mic isn't available
- 100+ Milkdrop presets included
- Random preset / auto-cycle mode with adjustable interval
- Favorites, with an option to cycle through favorites only
- Adjustable render resolution for slower devices
- Prev/next preset buttons for mobile
- Fullscreen support (where the browser allows it; on iPhone, add to Home Screen instead)
- Auto-hiding controls with tap-to-reveal
- Recovers from iOS audio interruptions and GPU context resets
- PWA support (installable, works offline; all dependencies are bundled in `vendor/`)

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| R | Random preset |
| Left / Right | Previous / next preset |
| C | Toggle auto-cycle |
| D | Toggle favorite |
| P | Play / pause (audio file mode) |
| F | Fullscreen |
| H | Hide / show controls |
| S | Settings |
| Esc | Close settings / show controls |

## Development

It's a static site with no build step. Serve the folder over HTTP(S), e.g. `python3 -m http.server`, and open it in a browser. Microphone access needs HTTPS or `localhost`.

The service worker fetches pages network-first, so deploys reach users on their next load. If you add files that should work offline, add them to `PRECACHE_URLS` in `sw.js` and bump `CACHE_NAME`.

## Credits

- [Butterchurn](https://github.com/jberg/butterchurn) by Jordan Berg
- [Milkdrop](http://www.geisswerks.com/about_milkdrop.html) by Ryan Geiss
- All the amazing preset creators
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (SIL OFL 1.1)

Third-party licenses are in [`vendor/LICENSES.txt`](vendor/LICENSES.txt).

## License

MIT
