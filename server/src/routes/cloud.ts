// Imports the Google Cloud client library
import {Storage} from '@google-cloud/storage'
import path from 'path';
import nanoid from 'nanoid';

// Creates a client
const storage = new Storage({
    keyFilename: path.join(__dirname, '../Windows 10-acc2e4b4cc3f.json')
});

const filename = 'src/public/red_and_blue__by_ririss_dcau0go-fullview.jpg';

export const uploadFile = async() => {
    // Uploads a local file to the bucket
    const bucketName = 'deviantart';

    await storage.bucket(bucketName).upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        public: true,
        resumable: false,
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
        }
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
};

// uploadFile();
