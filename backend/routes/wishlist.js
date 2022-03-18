const express = require('express');
const session = require('express-session');
const url = require('url');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { wishlist } = require('../models');

const router = express.Router();

//위시리스트 등록
router.post('/', async(req, res, next)=>{
    try{
        let { list_content } = req.body;
        const rows = await wishlist.create({list_content : list_content});
        if (rows) return res.status(200).json({result:rows});
        else throw console.log(error);
    } catch(err){
        console.error(err);
    }
});

// router.get('/list', async(req, res, next)=>{
//     try{
//         const rows = await wishlist.findAll();
//         if (rows) return res.status(200).json({result : rows});
//         else throw console.log(error);
//     } catch(err){
//         console.error(err);
//     }
// });

// router.get(`/:id`, (req, res, next)=>{
//     try{
//         const _url = req.url;
//         const queryData = url.parse(_url, true).query;
//         console.log(queryData);
//     }catch(err){
//         console.error(err);
//     }
// })

router.patch('/:id',isLoggedIn, async(req, res, next)=>{
    try{
        const {list_content} = req.body;
        const rows = await wishlist.update(
            {list_content: list_content},
            {
                where: {id: req.params.id}
            }
        );
        if (rows) return res.status(200).json({result : rows});
        else throw console.log(error);
    }catch(err){
        console.error(err);
    }
});

router.delete('/:id',isLoggedIn, async(req, res, next)=>{
    try{
      const rows = await wishlist.destroy({where: {id: req.params.id}});
      if (rows) return res.status(200).json({result : rows});
      else throw console.log(error);
    } catch {
      console.error(err);
    }
});

module.exports = router;