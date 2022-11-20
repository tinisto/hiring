module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      titleCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  )
  return Category
}
