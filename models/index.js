const fs = require("fs"); // node.js가 내장하고 있는 여러 모듈 중 하나이다. fs는 File system의 약자로서, fs모듈은 파일을 읽고, 저장하는등 파일과 관련된 모듈들을 내장하고 있다.
const { 
Sequelize,  // 시퀄라이즈 사용
DataTypes,  // 데이터타입 입력용
Op, // 연산자 사용
QueryTypes  // 이미 준비된 SQL 쿼리를 실행하는 것이 더 쉬운 사용 경우 사용
} = require("sequelize"); 
const path = require("path"); 
const basename = path.basename(__filename); // 파일명 추출후 출력

const dotenv = require('dotenv');
dotenv.config();
const { 
  DB_DATABASE, 
  DB_USER, 
  DB_PASSWORD, 
  DB_HOST
} = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD,{
  host : DB_HOST,
  dialect : 'mysql',
  operatorsAliases : 0,
  pool : {
      max : 5,
      min : 0,
      idle : 10000,
  }
}); // 시퀄라이즈에 DB정보 등록, pool설정

let db = [];

fs
.readdirSync(__dirname)
  .filter(file => {
// 파일이름 추출
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    );
  })
// 추출한 값을 하나하나하나 db[]안에 담음
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

//외래키 있으면 외래키끼리 연결시켜줌
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// sequelize, Op, QueryTypes 사용을 위한 선언
db.sequelize = sequelize;
db.Op = Op;
db.QueryTypes = QueryTypes;

// 내보내기
module.exports = db;