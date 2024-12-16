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
const Sequelize = require('sequelize')

module.exports = class Board extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            content: {
               type: Sequelize.STRING(140),
               allowNull: false,
            },
            img: {
               type: Sequelize.STRING(200),
               allowNull: true,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Board',
            tableName: 'boards',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Board.belongsTo(db.User, {
         foreignKey: 'UserId', // Board 테이블에 생성될 FK 컬럼 이름
         targetKey: 'id', // User 테이블의 참조될 PK
      })
      // db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' })
   }
}
/* ?? FK왜 안생기지 ?? */
