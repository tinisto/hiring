module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("Article", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  })

  Article.associate = (models) => {
    Article.belongsTo(models.User, { onDelete: "CASCADE" })
    Article.belongsTo(models.Category, { onDelete: "CASCADE" })
    Article.hasMany(models.Comment, { onDelete: "CASCADE" })
  }
  return Article
}
