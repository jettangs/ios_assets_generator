const fs = require('fs')

const { image_info, resize_image } = require('../lib')

const path = process.argv[2]

if(!path){

    console.log("no input file.")
}

const filename = path.substr(0,path.lastIndexOf('.'))

const dir = "AppIcon.appiconset"

let cont = fs.readFileSync('../contents/app_icon.json','utf-8')

cont = JSON.parse(cont)

let size = 1024;

(async ()=>{

    try{

        let info = await image_info(path)

        if(info.width == size && info.height == size ){

            let img = cont.images

            if(!fs.exists(dir,()=>{})){

                fs.mkdir(dir,()=>{})
            }

            for(let i in img){

                let _size = parseInt(img[i].size.substr(0,img[i].size.indexOf('x')))

                let _scale = img[i].scale

                _scale = parseInt(_scale.substr(0,_scale.indexOf('x')))

                let outpath = `${filename}_${_size}pt@${_scale}x.png`

                await resize_image(path, _size * _scale, _size * _scale, `${dir}/${outpath}`, ()=>{
            
                    img[i]['filename'] = outpath
                })
            }

            fs.writeFileSync(`${dir}/Contents.json`, JSON.stringify(cont,null,4))

        }else{

            console.log(`input image must be ${size} * ${size}`)
        }

    }catch(e){

        console.log(e)
    }
    
})()
