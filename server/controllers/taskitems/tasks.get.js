const TaskItem = require('../../models').TaskItem;
const express = require('express');
const router = express.Router();

router.get('', async (req, res) => {
  try {
    const filter = {
      order:
        req.query.chronology === 'reverse'
          ? [['createdAt', 'DESC']]
          : [['createdAt']],
    };
    if (req.query.complete)
      filter.where =
        req.query.complete === 'true'
          ? { complete: true }
          : { complete: false };

    const result = await TaskItem.findAll(filter);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
