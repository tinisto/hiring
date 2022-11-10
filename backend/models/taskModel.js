module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    name: {
      type: DataTypes.STRING,
      validate: { notEmpty: { msg: "Please add a Task" } },
    },

    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  return Task
}
