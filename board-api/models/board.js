/* const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Board = sequelize.define('Board', {
   id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
   },
   title: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   content: {
      type: DataTypes.TEXT,
      allowNull: false,
   },
   userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
})

module.exports = Board
 */
