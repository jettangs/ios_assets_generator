const fs = require('fs')

const sharp = require('sharp')

const { image_info, _image_info, _extract_image } = require('../lib')

const path = process.argv[2]

if(!path){

    console.log("no input file.")
}

const filename = path.substr(0,path.lastIndexOf('.'))

const dir = "LaunchImage.launchimage"

let cont = fs.readFileSync('../contents/launch_image.json','utf-8')

cont = JSON.parse(cont)

let img_size = { width: 1125, height: 2436 }

let scr_size = { 812: 375, 736: 414, 667: 375, 568: 320 }
;

(async ()=>{

    try{

        let info = await image_info(path)

        if(info.width == img_size.width && info.height == img_size.height ){

            let img = cont.images

            if(!fs.exists(dir,()=>{})){

                fs.mkdir(dir,()=>{})
            }

            for(let i in img){

                let height = parseInt(img[i].subtype.substring(0,img[i].subtype.length-1))
                
                let _scale = parseInt(img[i].scale.substr(0,img[i].scale.indexOf('x')))

                let width = scr_size[height] * _scale

                let outpath = `${filename}_h${height}pt@${_scale}x.png`

                height = height * _scale

                let img_resized = sharp(path).resize(width, null)

                let _info = await _image_info(img_resized)

                let _height = _info.height

                await _extract_image(img_resized, { left: 0, top: parseInt((_height-height)/2), width: width, height: height }, `${dir}/${outpath}`, ()=>{
                    
                    img[i]['filename'] = outpath
                })
            }

            fs.writeFileSync(`${dir}/Contents.json`, JSON.stringify(cont,null,4))

        }else{

            console.log(`input image must be ${ size.width }(w) * ${ size.height }(h)`)
        }

    }catch(e){

        console.log(e)
    }
    
})()
