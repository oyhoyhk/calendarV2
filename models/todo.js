module.exports = (sequelize, DataTypes) =>
    sequelize.define('todo', {
        year: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        month: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        start: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        end: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        detail: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        timestamps: true,
        paranoid: true,
    })