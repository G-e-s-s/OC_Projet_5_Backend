const sharp = require("sharp");
const fs = require('fs');

module.exports = async (req, res, next) => { 
    if (req.file !== undefined) {
        const timestamp = new Date().toISOString();
        const ref = `sharp-${req.file.filename}.webp`;
        await sharp(req.file.path)
          .webp({ quality: 20 })
          .toFile("./images/" + ref);
        console.log(req.file.filename);
        fs.unlink(`./images/${req.file.filename}`,(err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('File is deleted.');
            }
          });
        next();
    }
};