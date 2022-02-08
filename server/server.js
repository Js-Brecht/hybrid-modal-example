require('dotenv').config();
const Bluebird = require('bluebird');
const express = require('express');
const cors = require('cors');

const { port, host } = require('./constants');
const app = express();
const whitelist = [`http://${host}:8000`, `http://${host}:9000`, `http://${host}:${port}`];

module.exports = (started = () => null) => {

    const { getData, getImage } = require('./fetch');

    app.use(cors({
        origin: (origin, cb) => {
            if (!origin || whitelist.indexOf(origin) !== -1) {
                cb(null, true);
            } else {
                cb(new Error(`${origin} request denied by CORS`))
            }
        },
        optionsSuccessStatus: 200,
    }))

    app.use(async (req, res, next) => {
        console.log(`${req.method}: ${req.originalUrl}`);
        next()
    });

    app.get('/posts', Bluebird.method(async (req, res) => {
        const {
            // not usually needed, but this is a contrived example
            type = 'runtime',
            // which image id to start at
            start = ""
        } = req.query;

        const data = await getData();

        const startIndex = start && data.findIndex((val) => val.postId === start) + 1 || 0;
        const dataSlice = data.slice(
            startIndex,
            // limit to only the first 5 images if this is a build time call
            type === 'runtime' ? undefined : 5,
        );

        res.status(200).json(dataSlice);
    }))

    app.get('/images/:id', Bluebird.method(async (req, res) => {
        const {
            id: imageId
        } = req.params;

        const {
            width,
            height,
        } = req.query;

        try {
            if (imageId) {
                const imageData = await getImage(imageId, {
                    width: parseInt(width) || undefined,
                    height: parseInt(height) || undefined,
                });
                return res.status(200).send(imageData);
            }
            throw new Error('An image must be specified');
        } catch (err) {
            res.status(404);
            if (err.code === 'ENOENT') {
                return res.send(`Unable to find file at ${req.originalUrl}`);
            }
            return res.send(err.message);
        }
    }));

    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
        started();
    })
}