const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');


function ensureDirectoryExistence(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created: ${dirPath}`);
    } else {
        console.log(`Directory already exists: ${dirPath}`);
    }
}

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

function getFileNameFromUrl(fileUrl) {
    const parsedUrl = url.parse(fileUrl);
    const pathname = parsedUrl.pathname;
    const fileName = path.basename(pathname);

    return fileName;
}

module.exports = {
    downloadFile,
    getFileNameFromUrl,
    ensureDirectoryExistence
}