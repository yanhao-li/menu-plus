

module.exports = function DishFunc(sequelize, DataTypes) {
  const Dish = sequelize.define('Dish', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    discription: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: true,
    freezeTableName: true,
    classMethods: {
    },
  });
  return Dish;
};
