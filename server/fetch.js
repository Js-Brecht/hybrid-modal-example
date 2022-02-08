const path = require('path');
const fs = require('fs-extra');
const Bluebird = require('bluebird');
const sharp = require('sharp');
const fetch = require('node-fetch');
const Unsplash = require('unsplash-js');
const { LoremIpsum } = require('lorem-ipsum');
const { baseUrl } = require('./constants');

const Promise = Bluebird;

global.fetch = fetch;

const unsplash = new Unsplash.default({ accessKey: process.env.GATSBY_UNSPLASH_ACCESS_KEY });
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordPerSentence: {
        max: 16,
        min: 4,
    }
});

const imageDir = path.join(__dirname, 'images');
const cacheDir = path.join(__dirname, 'static');
const dataCache = path.join(cacheDir, 'data.json');
const minAge = 18;
const maxAge = 80;

const getImageFilename = (imageId) => `${imageId}.png`;

const getImagePath = (imageId) => path.join(imageDir, getImageFilename(imageId));

const getImageDownloadLink = (imageId) =>  `${baseUrl}/images/${imageId}`;

exports.getImagePath = getImagePath;

let data;
exports.getData = async () => {
    for (const folder of [cacheDir, imageDir]) {
        if (!(await fs.pathExists(folder))) {
            await fs.mkdirp(folder);
        }
    }

    if ((await fs.pathExists(dataCache))) {
        data = new Map(JSON.parse((await fs.readFile(dataCache, "utf8"))));
    } else {
        data = new Map();
        const images = await unsplash.search.photos('people', 1, 10, {
            orientation: 'portrait',
        }).then(Unsplash.toJson);
        for (const image of images.results) {
            const dataNode = {
                postId: image.id,
                name: lorem.generateWords(2),
                age: Math.floor(Math.random() * (maxAge - minAge)) + minAge,
                image
            }
            const imagePath = getImagePath(image.id);
            if (!(await fs.pathExists(imagePath))) {
                unsplash.photos.downloadPhoto(image);
                const imageData = await fetch(image.links.download).then((res) => res.buffer());
                await fs.writeFile(imagePath, imageData);
                image.links.download = getImageDownloadLink(image.id)
            }
            data.set(image.id, dataNode);
        }
        await fs.writeFile(dataCache, JSON.stringify(Array.from(data)));
    }
    
    return Array.from(data.values());
}

exports.getImage = async (imageId, resizeOpts) => {
    const filePath = getImagePath(imageId);
    await fs.stat(filePath)

    if (!data) await this.getData();

    unsplash.photos.downloadPhoto(data.get(imageId).image)
    return new Promise(async (resolve) => {
        if (resizeOpts.width !== undefined || resizeOpts.height !== undefined) {
            sharp(filePath)
                .resize(resizeOpts)
                .toBuffer()
                .then(resolve)
        } else {
            fs.readFile(filePath).then(resolve);
        }
    });
}