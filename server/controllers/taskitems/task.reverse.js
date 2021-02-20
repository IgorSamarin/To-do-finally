const TaskItem = require('../../models').TaskItem;

module.exports = {
  listReverse: async (req, res) => {
    try {
      const tasks = await TaskItem.findAll({
        order: [['createdAt']],
      });
      res.status(200).send(tasks);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
