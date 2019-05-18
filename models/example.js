// TEST MODLE
module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define("Example", {
    img: DataTypes.BLOB
    // description: DataTypes.TEXT
  });
  return Photo;
};
