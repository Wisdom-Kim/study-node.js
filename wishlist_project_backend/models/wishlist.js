module.exports = (sequelize, DataTypes) => (
    sequelize.define('wishlist', {
        list_content: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    },{
        timestamps: true,
        paranoid: true,
    })
);