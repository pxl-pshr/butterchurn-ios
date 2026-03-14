# Butterchurn iOS

A mobile-friendly Butterchurn (Milkdrop) visualizer that works on iOS Safari.

The [official butterchurnviz.com](https://butterchurnviz.com) uses the deprecated `navigator.getUserMedia` API which doesn't work on iOS. This version uses the modern `navigator.mediaDevices.getUserMedia()` API.

## Demo

[**Live Demo →**](https://pxl-pshr.github.io/butterchurn-ios/)

## Features

- ✅ Works on iOS Safari and iPad
- ✅ Microphone input for live audio visualization
- ✅ Audio file playback fallback (when mic is unavailable)
- ✅ 100+ Milkdrop presets included
- ✅ Random preset / auto-cycle mode
- ✅ Prev/next preset buttons for mobile
- ✅ Fullscreen support
- ✅ Auto-hiding controls with tap-to-reveal
- ✅ PWA support (installable, works offline)
- ✅ Keyboard shortcuts (R=random, C=cycle, F=fullscreen, H=hide, ←→=prev/next)

## Credits

- [Butterchurn](https://github.com/jberg/butterchurn) by Jordan Berg
- [Milkdrop](http://www.geisswerks.com/about_milkdrop.html) by Ryan Geiss
- All the amazing preset creators

## License

MIT
