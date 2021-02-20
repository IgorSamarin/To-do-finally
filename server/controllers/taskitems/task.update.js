const TaskItem = require('../../models').TaskItem;

module.exports = {
  update: async (req, res) => {
    try {
      const task = await TaskItem.findByPk(req.params.id);
      if (!task) {
        return res.status(404).send({
          message: 'Item Not Found',
        });
      }
      if (!req.body.text && req.body.complete === undefined) {
        return res.status(400).send({
          message: 'Invalid Request Body',
        });
      }
      task.update({
        text: req.body.text || task.text,
        complete:
          req.body.complete === undefined ? task.complete : req.body.complete,
      });
      res.status(200).send(task);
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
};
