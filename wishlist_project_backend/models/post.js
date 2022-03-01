module.exports = (sequelize, DataTypes) => (
    sequelize.define('post', {
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        img_path: {
            type: DataTypes.STRING(20),
            allowNull: false,
        }
    }, {
        timestamps: true,
        paranoid: true,
    })
);