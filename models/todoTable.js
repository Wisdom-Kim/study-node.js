module.exports = (sequelize, DataTypes) => {
    // 투두테이블 생성
      const todoTable = sequelize.define(
    // 이름 투두데이블
        "todoTable",
        {
    // idx칼럼 생성
          idx: {
            type:DataTypes.INTEGER, // 숫자
            primaryKey: true, // 기본지
            allowNull: false, // Null 없음
            autoIncrement : true // 자동 증가
          },
    // content 칼럼 생성
          content: {
            type:DataTypes.STRING(200),  // 문자 200 바이트
            unique: false, // 내용 중복 가능
            allowNull: false, // Null 없음
          },
          end_date: {
            type:DataTypes.DATE, // 숫자
            allowNull: true, // Null 없음
          },
        });
    // 투두테이블로 반환
      return todoTable;
    };