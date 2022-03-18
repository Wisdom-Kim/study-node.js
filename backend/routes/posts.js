const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { post, user } = require('../models');
const  { isLoggedIn } = require('./middlewares');
const { url } = require('inspector');

const router = express.Router();

fs.readdir('uploads', (error) => {
    if(error) {
        console.error('uploads 폴더를 생성합니다');
        fs.mkdirSync('uploads');
    }
});

const uploads = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, '/uploads');
        },
        filename(req, file, cb){
            const ext = path.extname(file.orginalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    limits: { fileSize: 5*1024*1024},
});

router.post('/img', isLoggedIn, uploads.single('img'), (req,res)=>{
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}`});
});

const upload2 = multer();

//글 등록 API
router.post('/', isLoggedIn, upload2.none(), async(req, res, next)=>{
    try {
        const posts = await post.create({
            title: req.body.title,
            content: req.body.content,
            img_path: req.body.img_path,
            user_id: req.session.user.id,
        });
        res.redirect('/');
    } catch (err){
        console.error(err);
        next(err);
    }
});

//글 조회 API
// router.get(':tilte', isLoggedIn, (req,res))

// //글 수정 API
// router.patch(':id', isLoggedIn, (req, res)=>{
//     const content = req.body
// });

//글 삭제 API
// router.delete(':id', isLoggedIn, (req, res)=>{
    
// })


module.exports = router;