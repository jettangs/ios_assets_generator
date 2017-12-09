const sharp = require('sharp')

const image_info = path => {

    return new Promise((resolve, reject) => {

        sharp(path).raw().toBuffer((err, data, info) => {

            if(err) reject(err)

            resolve(info)
        })
    })
}

const _image_info = image => {

    return new Promise((resolve, reject) => {

        image.raw().toBuffer((err, data, info) => {

            if(err) reject(err)

            resolve(info)
        })
    })
}

const resize_image = (path, width, height, outpath, callback) => {

    return new Promise((resolve, reject) => {

        sharp(path).resize(width, height).toFile(outpath,(err,info)=>{

            if(err) reject(err)

            if(callback) callback()

            resolve(info)
        })
    })
}


const _extract_image = (image, { left, top, width, height }, outpath, callback) => {

    return new Promise((resolve, reject) => {

        image.extract({ left: left, top: top, width: width, height: height }).toFile(outpath, err => {
            
            if(err) reject(err)

            if(callback) callback()

            resolve()
        })
    })
}


module.exports = { image_info: image_info, _image_info: _image_info, resize_image: resize_image, _extract_image: _extract_image }