const https = require('https');
const fs = require('fs');

// Function to download a file
function downloadFile(url, dest) {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close(() => {
                console.log('Download completed.');
            });
        });
    }).on('error', (err) => {
        fs.unlink(dest, () => {}); // Delete the file on error
        console.error('Error downloading the file:', err.message);
    });
}

module.exports = {
    downloadFile
}