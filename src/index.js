require('dotenv').config()
const express = require("express");
const { getTheImage } = require("./file-storage");

const PORT = process.env.PORT;
const storageAccountName = process.env.storageAccountName;
const storageAccessKey = process.env.storageAccessKey;

const app = express();

app.get("/image", async(req,res) => {
    const imagePath = req.query.path;
    const [response, properties] = await getTheImage(storageAccountName, storageAccessKey, imagePath);

    res.writeHead(200, {
        "Content-length": properties.contentLength,
        "content": "image/jpeg",

    });
    response.readableStreamBody.pipe(res);
});
app.listen(PORT, () => {
    console.log(`Azure storage service is up and listening to port ${PORT}`);
});
