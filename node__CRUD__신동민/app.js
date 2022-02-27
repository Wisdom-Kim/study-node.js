var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const db = require('./models')
const {todolist} = require('./models');

var app = express();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { error } = require('console');

db.sequelize.authenticate()
.then(async()=>{
  console.log('db connect ok');
  await db.sequelize.sync({force: false});
})
.catch(err => {
  console.error(err);
})

//create
app.post('/create', async(req,res)=>{
  let {content} = req.body;
  try{
    const rows = await todolist.create({
      content : content,
    });
    if (rows) return res.status(200).json({result:rows});
    else throw console.log(error);
  } catch(err){
    console.error(err);
  }
});

app.get('/list', async(req,res)=>{
  try{
    const rows = await todolist.findAll();
    if (rows) return res.status(200).json({result : rows});
    else throw console.log(error);
  } catch(err){
    console.error(err);
  }
});

app.post('/update', async(req,res)=>{
  try{
    const {index, content} =req.body;
    const rows = await todolist.update(
      {content: content},
      {
        where: {index:index}
      }
    );
    if (rows) return res.status(200).json({result : rows});
    else throw console.log(error);
  }catch(err){
    console.error(err);
  }
});

app.post('/delete', async(req,res)=>{
  try{
    const {index} = req.body;
    const rows = await todotable.destroy({where: {index: index}});
    if (rows) return res.status(200).json({result : rows});
    else throw console.log(error);
  } catch {
    console.error(err);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/',(req,res)=>{
  res.send("Hello World");
})

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
