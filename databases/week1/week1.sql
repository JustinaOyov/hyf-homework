-- 1. Find out how many tasks are in the task table
SELECT COUNT(*) FROM task;
-- Result: 35 data rows returned

-- 2. Find out how many tasks in the task table do not have a valid due date
SELECT COUNT(*) as due_date FROM task WHERE due_date IS NULL;
-- Result: 8 data rows returned

-- 3. Find all the tasks that are marked as done
SELECT task.title, status.name 
FROM task, status 
WHERE task.status_id = status.id 
AND status.name = 'Done';
-- Result: 12 data rows returned
  
-- 4. Query: Find all the tasks that are not marked as done
SELECT task.title, status.name 
FROM task, status 
WHERE task.status_id = status.id 
AND NOT status.name = 'Done'; 
-- Result: 23 data rows returned

-- 5. Get all the tasks, sorted with the most recently created first
SELECT id, title, created FROM task ORDER BY created DESC;
-- Result: 35 data rows returned

-- 6. Get the single most recently created task
SELECT id, title, created FROM task ORDER BY created DESC LIMIT  0,1;
/* Result:  Id 		Description							Created
			25		Look at apartments in Ørestad		2017-10-30 09:47:00
*/
-- 7. Get the title and due date of all tasks where the title or description contains database
SELECT title, due_date 
FROM task 
WHERE title LIKE '%database%' OR description LIKE '%database%';
/*Result: 	Setup salary databases for accounting	2017-12-05 00:19:08
			Learn how databases work	2017-12-18 05:08:05
			Make the databases perform better	2017-12-01 13:28:35
			Backup databases to external disk	2017-12-23 14:21:01
			Learn about NoSQL databases	2017-12-23 10:13:42
*/

-- 8. Get the title and status (as text) of all tasks
SELECT task.id, task.title, status.name AS status FROM task
INNER JOIN status ON status.id = task.status_id;
-- Result: 35 data rows returned

-- 9. Get the name of each status, along with a count of how many tasks have that status
SELECT status.id, status.name, COUNT(task.status_id) AS task_Count 
FROM status 
INNER JOIN task ON task.status_id = status.id
GROUP BY task.status_id;
-- Result: Not started - 8,	In progress	- 15,	Done - 12

-- 10. Get the names of all statuses, sorted by the status with most tasks first
SELECT status.name, COUNT(task.status_id) as task_count 
FROM status 
INNER JOIN task ON task.status_id = status.id
GROUP BY task.status_id
ORDER BY task_count DESC;
-- Result: In progress	- 15,	Done - 12,	Not started - 8

 