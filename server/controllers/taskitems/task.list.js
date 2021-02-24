const TaskItem = require('../../models').TaskItem;

module.exports = {
  list: async (req, res) => {
    if (req.query.complete === 'all') {
      return listAll(req, res);
    } else {
      return listFilter(req, res);
    }
  },
};

const listAll = async (req, res) => {
  try {
    let reqChronology;
    switch (req.query.chronology) {
      case 'normal':
        reqChronology = [['createdAt']];
        break;
      case 'reverse':
        reqChronology = [['createdAt', 'DESC']];
        break;
      default:
        return res.status(400).send({
          message: 'Not Found Date Chronology Param',
        });
    }
    const tasks = await TaskItem.findAll({
      raw: true,
      order: reqChronology,
    });
    res.status(200).send(tasks);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
};

const listFilter = async (req, res) => {
  try {
    let reqChronology;
    switch (req.query.chronology) {
      case 'normal':
        reqChronology = [['createdAt']];
        break;
      case 'reverse':
        reqChronology = [['createdAt', 'DESC']];
        break;
      default:
        return res.status(400).send({
          message: 'Not Found Date Chronology Param',
        });
    }
    let reqComplete;
    switch (req.query.complete) {
      case 'true':
        reqComplete = { complete: true };
        break;
      case 'false':
        reqComplete = { complete: false };
        break;
      default:
        return res.status(400).send({
          message: 'Not Found Completeness Parameter',
        });
    }
    const tasks = await TaskItem.findAll({
      raw: true,
      order: reqChronology,
      where: reqComplete,
    });
    res.status(200).send(tasks);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
};
