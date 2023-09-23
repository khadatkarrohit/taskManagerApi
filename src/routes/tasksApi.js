const express = require('express');
const router = express.Router();
const tasks = require('../data/tasks.json');
const moment = require('moment');

/* Get all tasks */
router.get('/',  (req, res, next) => {
  try { 

    // This if will work without query param
    // URL: localhost:8080/api/tasks
    if (Object.keys(req.query).length == 0) {
        res.status(200).send(tasks);        
    }

    // This will work with query param for sort
    // URL: localhost:8080/api/tasks?sort=created_at&orderby=desc
    let orderby = req.query.orderby;
    let sort = req.query.sort;
    const sortObject = {};
    sortObject['sort'] = orderby === 'asc' ? 1 : -1;    
    if (sortObject.sort == 1) {
        tasks.sort((a, b) => moment(a.created_at).diff(moment(b.created_at)));        
    } else {
        tasks.sort((a, b) => moment(b.created_at).diff(moment(a.created_at)));        
    }    
    console.log(tasks);
    res.status(200).send(tasks); 
  } catch (error) {
    next(error);
  }
});

/* 
 Get a single task by its ID
 URL: localhost:8080/api/tasks/1
*/

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

/* 
 Delete a task by its ID
 URL: localhost:8080/api/tasks/1
 */

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

/* 
Create a new task
URL: localhost:8080/api/tasks
body: 
{
    "task_name": "Create Java API",       
    "description": "Create Java Crud Operation",
    "priority_level": "high"                   
}
 */

router.post('/',  (req, res, next) => {
    try {
      const { task_name, description, priority_level } = req.body; 

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
        "description": description,
        "priority_level": priority_level,
        "created_at": moment().format() 
      }

      tasks.push(insert_obj);

      res.status(200).send('New task Successfully Get added.');
    } catch (error) {
      next(error);
    }
  });

/* 
Update an existing task by its ID
URL: localhost:8080/api/tasks/1
body: 
{
    "task_name": "Create Java API",       
    "description": "Create Java Crud Operation",
    "priority_level": "high"                   
}
 */

router.put('/:id',  (req, res, next) => {
    try {
        const { id } = req.params;
        const { task_name, description, priority_level } = req.body;
  
        if ((task_name ==  "" | null | undefined) || (description == "" | null | undefined)) {        
          return res.status(400).send('Please check task name or description for updation');
        } 
        
        const tasks_found =  tasks.filter(val => val.task_name == task_name);
        
        if (tasks_found.length > 0) {        
          return res.status(200).send('Task name already available !!! You Cannot update. Change the task name.');
        } 
  
        const tasks_id_found =  tasks.filter(val => val.id == id);

        if (!tasks_id_found) {
            const error = new Error('There is no task found for provided ID');
            return res.status(404).send(error);
        }

        tasks_id_found[0].task_name = task_name;
        tasks_id_found[0].description = description;
        tasks_id_found[0].priority_level = priority_level;
  
        res.status(200).send('Property is get updated.');
    } catch (error) {
      next(error);
    }
  });


  /* 
 Get a tasks based on priority level
 URL: localhost:8080/api/tasks/priority/high
*/

router.get('/priority/:level',  (req, res, next) => {
    try {
      const priority_level  = req.params;            
      const tasks_found =  tasks.filter(val => val.priority_level == priority_level.level);        
      if (!tasks_found) {
        const error = new Error('There is no task found for provided priority level');
        return res.status(404).send(error);
      }  
      return res.status(200).json(tasks_found);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;