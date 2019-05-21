// TEST MODLE
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    img: DataTypes.STRING
    // description: DataTypes.TEXT
  });
  return Post;
};
