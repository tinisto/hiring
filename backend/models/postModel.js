module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    viewsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  })

  Post.associate = (models) => {
    Post.belongsTo(models.User, { onDelete: "CASCADE" })
    Post.hasMany(models.Comment, { onDelete: "CASCADE" })
  }
  return Post
}
