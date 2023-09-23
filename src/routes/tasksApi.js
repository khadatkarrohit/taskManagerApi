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

/* Create a new task */
router.post('/',  (req, res, next) => {
    try {
      const { task_name, description } = req.body; 

      if ((task_name ==  "" | null | undefined) || (description == "" | null | undefined)) {        
        return res.status(400).send('Please check task name or description');
      }

      const tasks_found =  tasks.filter(val => val.task_name == task_name);
      
      if (tasks_found.length > 0) {        
        return res.status(200).send('Task name already available !!! Kindly add new task.');
      }

      let curr_max_id = Math.max.apply(null, tasks.map(itr => itr.id));
      let new_id = curr_max_id + 1; // Auto Increment ID
      const insert_obj = {
        "task_name": task_name,
        "is_completed": false,
        "id": new_id,
        "description": description
      }

      tasks.push(insert_obj);

      res.status(200).send('New task Successfully Get added.');
    } catch (error) {
      next(error);
    }
  });

module.exports = router;