module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define("News", {
    titleNews: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    textNews: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    viewCountNews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  })

  News.associate = (models) => {
    News.belongsTo(models.User, { onDelete: "CASCADE" })
  }
  return News
}
