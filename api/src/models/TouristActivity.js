const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
  sequelize.define('touristActivity', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true 
    },
    difficulty:{
      type: DataTypes.INTEGER,
      validate:{
        min:1,
        max:5
      },
      allowNull: false
    },
    time:{
      type: DataTypes.CHAR,
      allowNull: false
    },
    season:{
      type: DataTypes.ENUM('winter','summer','spring','autumn'),
      allowNull: false
    }
   
  },{timestamps: false});
};