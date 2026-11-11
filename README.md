# Butterchurn iOS

![Butterchurn visualizer running a Milkdrop preset](docs/screenshot.jpg)

A mobile-friendly [Butterchurn](https://github.com/jberg/butterchurn) (Milkdrop) music visualizer that works on iPhone and iPad.

The [official butterchurnviz.com](https://butterchurnviz.com) uses the deprecated `navigator.getUserMedia` API, which doesn't work on iOS. This version uses the modern `navigator.mediaDevices.getUserMedia()` API and is built for touch screens.

**[Open the live demo](https://pxl-pshr.github.io/butterchurn-ios/)**

## How to use

1. Open the demo in Safari (or any modern browser).
2. Tap **Enable Microphone** to visualize whatever is playing around you, or **Load Audio File** to play a song from your device.
3. The controls hide after a few seconds. Tap the screen (or move the mouse) to bring them back, and swipe left or right to change preset. To keep the controls on screen, tap the eye button; tap it again to let them hide.
4. To switch between the microphone and a file, or play a different song, open **Settings → Change Audio Source**. What's playing keeps going until you pick the new source.

Needs iOS 15 or later on iPhone and iPad, or any browser with WebGL 2.

**Fullscreen on iPhone:** iPhone Safari doesn't allow web pages to go fullscreen. Instead, tap **Share → Add to Home Screen** and launch it from there. It opens fullscreen and works offline.

## Features

- Live microphone input, or audio file playback with play/pause, switchable at any time
- 100 Milkdrop presets with previous/next, random, and auto-cycle
- Favorites, with an option to cycle through favorites only
- Adjustable cycle interval and render resolution (lower it if a preset stutters)
- Controls that hide themselves and come back on a tap, or stay on screen if you prefer
- Swipe left or right to change preset, with the preset name shown briefly
- Settings, favorites, the last preset, and auto-cycle are remembered between visits
- Keeps the screen awake while it runs, and plays audio files even with the ring switch on silent (iOS 16.4+)
- Installable as an app and works offline

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| R | Random preset |
| Left / Right | Previous / next preset |
| C | Toggle auto-cycle |
| D | Toggle favorite |
| P | Play / pause (audio file mode) |
| F | Fullscreen |
| H | Auto-hide controls on / off |
| S | Settings |
| Esc | Close settings / keep controls on screen / cancel changing the audio source |

## Development

It's a static site with no build step. Serve the folder and open it in a browser:

```bash
python3 -m http.server
```

Microphone access needs HTTPS or `localhost`. Butterchurn, the presets, and the font are bundled in `vendor/`, so there are no external requests.

The service worker loads pages network-first, so deploys reach users on their next visit. If the network hasn't answered within 3 seconds, it serves the cached copy instead. If you add files that should work offline, add them to `PRECACHE_URLS` in `sw.js` and bump `CACHE_NAME`.

The vendored scripts have their version in the file name (e.g. `butterchurn-2.6.7.min.js`) because the service worker serves them from cache. To upgrade one, add the new file under a new name, update its `<script>` tag and `PRECACHE_URLS`, and bump `CACHE_NAME`. Don't overwrite a vendored file in place, or the first launch after the deploy will pair the new page with the old cached script.

## Credits

- [Butterchurn](https://github.com/jberg/butterchurn) by Jordan Berg
- [Milkdrop](http://www.geisswerks.com/about_milkdrop.html) by Ryan Geiss
- All the amazing preset creators
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (SIL OFL 1.1)

Third-party licenses are in [`vendor/LICENSES.txt`](vendor/LICENSES.txt).

## License

MIT
