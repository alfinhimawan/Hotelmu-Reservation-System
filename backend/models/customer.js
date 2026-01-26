'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.pemesanan, { foreignKey: 'id_customer', as: 'pemesanan' });
    }
  }
  customer.init({
    id_customer: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: DataTypes.STRING,
    foto: DataTypes.TEXT,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'customer',
    tableName: 'customer'
  });
  return customer;
};