import { Router, Request, Response } from 'express';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import nanoid from 'nanoid';
import { Storage } from '@google-cloud/storage';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + '.jpg')
    }
});

// Creates a client
const cloudStorage = new Storage({
    keyFilename: path.join(__dirname, '../Windows 10-acc2e4b4cc3f.json')
});


const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

const upload = multer({ storage: storage });

const uploadRouter = Router();

uploadRouter.post('/', multerMid.single('file'), async (req: Request, res: Response) => {
    console.log(req.file);
    const bucketName = 'deviantart';

    const bucket= cloudStorage.bucket(bucketName);
    const extName = path.extname(req.file.originalname);
    const uniqueId = nanoid();
    const gcsFileName = `${uniqueId}${extName}`;
    const file = bucket.file(gcsFileName);

    const stream = file.createWriteStream({
        public: true,
        gzip: true,
        metadata: {
            contentType: req.file.mimetype,
            cacheControl: 'public, max-age=31536000',
        },
        resumable: false
    });

    stream.on('finish', () => {
        console.log(`${gcsFileName} uploaded to ${bucketName}.`);
        res.json({
            publicUrl: `https://storage.googleapis.com/deviantart/${gcsFileName}`
        })
    });

    stream.end(req.file.buffer);

   /* await cloudStorage.bucket(bucketName).upload('x.jpg', {
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
    });*/
});

/*export const upload = async (req: Request, res: Response) => {
    const form = new IncomingForm();

    let filePath: string;

    form.on('fileBegin', (name, file) => {
        file.path = __dirname + '/uploads/' + file.name;
        filePath = __dirname + '/uploads/' + file.name;
    });
    form.on('file', (field, file) => {
        // Do something with the file
        // e.g. save it to the database
        // you can access it using file.path
        console.log('file', file.name);
        file.path = __dirname + '/uploads/' + file.name;
        const readStream = fs.createReadStream(file.path);
    });

    form.on('end', () => {
        res.json({
            xd: true
        });
    });
    form.on('aborted', (args) => {
        console.error('Request aborted by the user');
        fs.unlink(filePath, () => {
            console.log('file is removed!');
        });
   /!*     res.header('Connection', 'close');
        res.end('Upload too large')*!/
    });
    form.on('error', (err) => {
        console.error('Error', err);
        throw err
    });
    form.parse(req);
};*/

export default uploadRouter;
