module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        user_password: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
);