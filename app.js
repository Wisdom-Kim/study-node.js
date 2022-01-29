const express = require('express')
const app = express()
const pool = require('./database');
const cors = require('cors');
const { todoTable } = require('./models') // 작성한 테이블
const db = require('./models')   // mysql 시퀄라이저 모델

// 시퀄라이즈 실행
db.sequelize
.authenticate()
.then(async () => {
    console.log('db connect ok');
    await db.sequelize.sync({force : false});
})
.catch(err => {
    console.log('db' + err);
});

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.post('/create', async (req, res) => {
  try{
    let {content} = req.body; // body에서 할일 내용을 입력받아옴
    console.log(content);
    const conn = await pool.getConnection(); // pool에서 커넥션을 가져오기
    let sql = 'insert into todoTable (content) values(?)'; // db에 content를 넣는 쿼리문 작성;
    let data = [content]; // data에 content 담기
    console.log(data);
    const [rows] = await pool.query(sql,data); //쿼리문 실행 및 rows에 담기
    res.status(200).json({ result : rows }); // json형식으로 rows 전달
    conn.release(); // 커넥션을 다시 pool로 반환
  } catch (error){
    console.log(error); // 에러잡기
  }
});
//익스프레스가 지원해주는 restAPI
app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get('/list', async (req, res) => {
    try{
          // select>findAll
      const rows = await todotable.findAll();
      if (rows) return res.status(200).json({result : rows});
      else throw console.log(error);
    } catch(err){
      console.log(err);
    }
  });

  app.post('/create', async (req, res) => {
    try{
          let {content} = req.body;
    // body에서 값을 받아오고 쿼리문을 시퀄라이즈 문법으로 변형합니다. insert>create
          const rows = await todotable.create({
          content : content
          });
          if (rows) return res.status(200).json({result : rows});
          else throw console.log(error);
        } catch(err){
          console.log(err);
        }
    });

    app.post('/update', async (req, res) => {
        try{
          let {idx, content} = req.body;
          // update>update
          const rows = await todotable.update(
            {content: content},
           {
             where : {idx : idx}
           }
           );
           if (rows) return res.status(200).json({result : rows});
           else throw console.log(error);
       } catch(err){
         console.log(err);
       }
      });

      app.post('/delete', async (req, res) => {
        try{
          let {idx} = req.body;
      // delete>destroy
          const rows = await todotable.destroy({ where : {idx : idx} });
          if (rows) return res.status(200).json({result : rows});
          else throw console.log(error);
        } catch(err){
          console.log(err);
        }
      });
      
app.listen(8080);