module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("Article", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    CategoryId: {
      type: DataTypes.INTEGER,
    },
  })

  Article.associate = (models) => {
    Article.belongsTo(models.User, { onDelete: "CASCADE" })
    Article.hasMany(models.Comment, { onDelete: "CASCADE" })
  }
  return Article
}
