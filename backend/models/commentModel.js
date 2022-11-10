module.exports = (sequelize, Datatypes) => {
  const Comment = sequelize.define("Comment", {
    commentText: {
      type: Datatypes.TEXT,
      allowNull: false,
    },
  })
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { onDelete: "CASCADE" })
    Comment.belongsTo(models.Post, { onDelete: "CASCADE" })
  }

  return Comment
}
