const express = require('express');
const router = express.Router();
const tasks = require('../data/tasks.json');

/* Get all tasks */
router.get('/',  (req, res, next) => {
  try {
    res.status(200).send(tasks);
  } catch (error) {
    next(error);
  }
});

/* Get a single task by its ID */
router.get('/:id',  (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks_found =  tasks.filter(val => val.id == id);

    if (!tasks_found) {
      const error = new Error('There is no task found for provided ID');
      return res.status(404).send(error);
    }

    return res.status(200).json(tasks_found[0]);
  } catch (error) {
    next(error);
  }
});

/* Delete a task by its ID */
router.delete('/:id',  (req, res, next) => {
  try {
    const { id } = req.params;
    var index = tasks.map(x => {return x.Id;}).indexOf(id);
    tasks.splice(index, 1); 
    res.status(200).send('Tasks has been deleted for provided ID');
  } catch (error) {
    next(error);
  }
});

module.exports = router;