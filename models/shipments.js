module.exports = (sequelize, DataTypes) => {
    const Shipments = sequelize.define('shipments', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tracking: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        carrier: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        exp_delivery: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    });
    // Associates shipment to User
    Shipments.associate = (models) => {
        Shipments.belongsTo(models.User, {
            onDelete: 'CASCADE',
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Shipments;
};