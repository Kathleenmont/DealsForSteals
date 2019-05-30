module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    restaurant: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // why: {
    //   type: DataTypes.TEXT,
    //   allowNull: true,
    //   len: [1]
    // },
    restAdd: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [0]
    },
    restLat: {
      type: DataTypes.DECIMAL(10, 5),
      allowNull: true,
      len: [1]
    },
    restLong: {
      type: DataTypes.DECIMAL(10, 5),
      allowNull: true,
      len: [1]
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
      len: [0]
    },
    yelpUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [0]
    },
    typeOfPlace: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [0]
    },
    photo: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
      len: [0]
    },
    photoID: {
      type: DataTypes.STRING,
      allowNull: true,
      len: [0]
    }
  });

  // Post.associate = function(models) {
  //   Post.belongsTo(models.Author, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  Post.associate = function(models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
