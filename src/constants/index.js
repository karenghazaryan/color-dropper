const initialSrc = 'https://uploads8.wikiart.org/temp/3fdf121e-20b2-48f5-a5b3-4f53dc55c498.jpg!Portrait.jpg';

const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/; // eslint-disable-line

const dropperWidth = 100;

const dropperHeight = 100;

export {
    initialSrc,
    urlRegex,
    dropperWidth,
    dropperHeight
}