import express, { Request, Response } from 'express';

const app = express();

import cors from 'cors';
import bodyParser from 'body-parser';
import uploadRouter from './routes/upload';

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

app.use('/upload', uploadRouter);

app.listen(3333, () => {
    console.log('App listening on localhost:3333')
});
