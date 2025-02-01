// Import ArtPlayer and HLS plugin
import Artplayer from 'https://unpkg.com/artplayer/dist/artplayer.js';
import Hls from 'https://unpkg.com/hls.js/dist/hls.min.js';
import artplayerPluginHlsControl from 'https://unpkg.com/artplayer-plugin-hls-control';

// Function to initialize ArtPlayer
function initializeArtPlayer(m3u8Url) {
    const art = new Artplayer({
        container: '#video', // The container element for the player
        url: m3u8Url, // The .m3u8 URL to play
        setting: true,
        plugins: [
            artplayerPluginHlsControl({
                quality: {
                    control: true,
                    setting: true,
                    getName: (level) => level.height + 'P',
                    title: 'Quality',
                    auto: 'Auto',
                },
                audio: {
                    control: true,
                    setting: true,
                    getName: (track) => track.name,
                    title: 'Audio',
                    auto: 'Auto',
                }
            }),
        ],
        customType: {
            m3u8: function playM3u8(video, url, art) {
                if (Hls.isSupported()) {
                    if (art.hls) art.hls.destroy();
                    const hls = new Hls();
                    hls.loadSource(url);
                    hls.attachMedia(video);
                    art.hls = hls;
                    art.on('destroy', () => hls.destroy());
                } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = url;
                } else {
                    art.notice.show = 'Unsupported playback format: m3u8';
                }
            }
        },
        playsInline: true, // Enable inline playback on mobile devices
        autoplay: true, // Autoplay the video
        volume: 0.3, // Set initial volume
        fullscreen: true, // Enable fullscreen
        fullscreenWeb: true, // Enable web fullscreen
        mutex: true, // Ensure only one player is playing at a time
        backdrop: true, // Show backdrop
        airplay: true, // Enable AirPlay
        theme: '#23ade5', // Set player theme color
        lang: navigator.language.toLowerCase(), // Set player language
    });

    // ArtPlayer already has built-in keyboard shortcuts:
    // - Space: Play/Pause
    // - Arrow Up/Down: Volume control
    // - Arrow Left/Right: Seek
    // - F: Toggle fullscreen
    // - M: Mute
    // No need for Mousetrap or additional code!
}

// Get the .m3u8 URL from the hash
const m3u8Url = decodeURIComponent(window.location.href.split("#")[1]);

// Initialize ArtPlayer with the .m3u8 URL
if (m3u8Url) {
    initializeArtPlayer(m3u8Url);
} else {
    console.error('No .m3u8 URL provided');
}
