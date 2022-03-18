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

//위시리스트 수정
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

//위시리스트 삭제
router.delete('/:id',isLoggedIn, async(req, res, next)=>{
    try{
      const rows = await wishlist.destroy({where: {id: req.params.id}});
      if (rows) return res.status(200).json({result : rows});
      else throw console.log(error);
    } catch {
      console.error(err);
    }
});


//위시리스트 랜덤 추첨
router.get('/', async(req, res, next)=>{
    try{
        const rows = await wishlist.findAll();
        const length = Object.keys(rows).length;
        console.log(length);
        const id = Math.floor(Math.random()*(length)) + 1;
        const list = await wishlist.findOne({
            where:{id}
        });
        return res.status(200).json({list});
    } catch {
        console.error(err);
    }
})

module.exports = router;