const TaskItem = require('../../models').TaskItem;
module.exports = {
  destroy: async (req, res) => {
    try {
      const task = await TaskItem.findByPk(req.params.id);
      if (!task) {
        return res.status(404).send({
          message: 'Item Not Found!',
        });
      }
      task.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
};
