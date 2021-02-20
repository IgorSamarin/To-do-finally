const TaskItem = require('../../models').TaskItem;

module.exports = {
    listUndone: async (req, res) => {
        try {
          const tasks = await TaskItem.findAll({
            where: {
              complete: 'false',
            },
            order: [['createdAt', 'DESC']],
          });
          res.status(200).send(tasks);
        } catch (err) {
          res.status(400).send(err);
        }
      },
};
