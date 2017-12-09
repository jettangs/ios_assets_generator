const fs = require('fs')

const { image_info, resize_image } = require('../lib')

const path = process.argv[2]

const _scale_ = process.argv[3]

if(!path){

    console.log("no input file.")
}

const filename = path.substr(0,path.lastIndexOf('.'))

const dir = `${filename}.imageset`

let cont = fs.readFileSync('../contents/fullscreen_image.json','utf-8')

cont = JSON.parse(cont)
;
(async ()=>{

    try{

        let info = await image_info(path)

        let _width = parseInt(info.width/_scale_)

        let _height = parseInt(info.height/_scale_)

            
            //console.log(info.height)

        let img = cont.images

        if(!fs.exists(dir,()=>{})){

            fs.mkdir(dir,()=>{})
        }

        for(let i in img){

            let _scale = parseInt(img[i].scale.substr(0,img[i].scale.indexOf('x')))

            let outpath = `${filename}@${_scale}x.png`

            await resize_image(path, _width * _scale, _height * _scale, `${dir}/${outpath}`, ()=>{
        
                img[i]['filename'] = outpath
            })
        }

        fs.writeFileSync(`${dir}/Contents.json`, JSON.stringify(cont,null,4))

    }catch(e){

        console.log(e)
    }
    
})()
