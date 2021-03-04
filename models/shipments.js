module.exports = (sequelize, DataTypes) => {
  const Shipments = sequelize.define("shipments", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tracking: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carrier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expDelivery: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    delivered: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  });
  // Associates shipment to User
  // Shipments.associate = models => {
  //   Shipments.belongsTo(models.User.username, {
  //     onDelete: "CASCADE",
  //     foreignKey: {
  //       allowNull: true
  //     }
  //   });
  // };
  return Shipments;
};
