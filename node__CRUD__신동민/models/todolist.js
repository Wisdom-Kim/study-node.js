module.exports = (sequelize, DataTypes) => {
    const todolist = sequelize.define("todolist",{
        index: {
            type: DataTypes.INTEGER,
            primaryKey: true, //기본키
            allowNull:false, //Null 허용 불가능
            autoIncrement:true, // 자동 증가
        },
        content: {
            type: DataTypes.STRING(200),
            unique: false, //내용 중복 가능
            allowNull: false,
        }
    });
    return todolist;
};