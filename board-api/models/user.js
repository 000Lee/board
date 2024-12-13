const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            email: {
               type: Sequelize.STRING(40),
               allowNull: true,
               unique: true,
            },
            nick: {
               type: Sequelize.STRING(15),
               allowNull: false,
            },
            password: {
               type: Sequelize.STRING(100),
               allowNull: true,
            } /* 
            provider: {
               type: Sequelize.STRING(10),
               allowNull: false,
               defaultValue: 'local',
            },
            snsId: {
               type: Sequelize.STRING(30),
               allowNull: true,
            }, */,
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      // 관계를 정의하지 않아도 빈 메서드를 추가하여 오류를 방지
   }
}
