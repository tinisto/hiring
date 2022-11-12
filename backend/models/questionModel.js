module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("Question", {
    textQuestion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    viewCountQuestion: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  })

  Question.associate = (models) => {
    Question.belongsTo(models.User, { onDelete: "CASCADE" })
  }
  return Question
}
