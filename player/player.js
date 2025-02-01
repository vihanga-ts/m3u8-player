// Retrieve the m3u8 URL from the window's hash
const m3u8Url = decodeURIComponent(window.location.hash.substring(1));

// Check if the URL is valid
if (!m3u8Url) {
    alert('Invalid m3u8 URL');
    throw new Error('Invalid m3u8 URL');
}

// Initialize ArtPlayer
const art = new Artplayer({
    container: '#artplayer-container',
    url: m3u8Url,
    title: m3u8Url,
    volume: 0.3,
    isLive: true,
    plugins: [
        artplayerPluginHls(),
    ],
    moreVideoAttr: {
        crossOrigin: 'anonymous',
    },
});

// Handle errors
art.on('error', (error) => {
    console.error('Error occurred:', error);
    alert('An error occurred while playing the video.');
});
