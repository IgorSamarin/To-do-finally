const TaskItem = require('../../models').TaskItem;

module.exports = {
    retrieve: async (req, res) => {
        try {
          const task = TaskItem.findByPk(req.params.id);
          if (!task) {
            return res.status(404).send({
              message: 'Item Not Found!',
            });
          }
          res.status(200).send(task);
        } catch (err) {
          res.status(400).send(err.message);
        }
      },
};
