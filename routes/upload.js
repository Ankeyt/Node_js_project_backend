
const express= require("express");
const multer=require("multer")
const router=express()
const picModal=require("../models/Pic")
const filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./files")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload=multer({storage:filestorage})


router.get('/find/:id',async (req,res)=>{
   const data=await picModal.find({"userId":req.params.id})
   res.status(201).json(data)
})



router.post('/single',upload.single("image"),async (req,res)=>{
    //console.log(req.file)
   try {
    const {userId}=req.body
   // console.log(userId)
    //const x='files/'+req.file.originalname;
   // const x=req.file.originalname
    const x = `http://localhost:5000/images/${req.file.originalname}`;
    const min = 10000;
    const max = 99999;
    const num = Math.floor(Math.random() * min) + max;
    const file= await picModal.create({
        userId,
        picUrl:x,
        code:num
    })
    return res.status(200).json(file)
   } catch (error) {
       console.log(error)
       
   }
   // res.send("Single file upload success")
})





module.exports=router