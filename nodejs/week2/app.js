/********  app.js  ********/
/* Description: HackYourFuture CRUD App 
   Allows users to find HYF courses and mentors. 
*/ 
const express = require("express");
//const cors = require("cors");
const app = express();
app.use(express.json());
//app.use(cors());

// Insert modules/files containing: 'courses' & 'mentors' 
const Courses = require("./Courses.js");
const Mentors = require("./Mentors.js");
const hyf_mentors = new Mentors("./data/mentors.json");  
const hyf_courses = new Courses("./data/courses.json"); 

// initialise Port & start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

/********** GET Route **********/
/** Get /mentors - returns all mentors data as JSON. 
 If `query` parameter `startsWith` is provided, get only mentors with name starting with provided letter.
 e.g GET http://localhost:<3000 or env port num>/mentors?startsWith=<letter here>
**/ 
app.get('/mentors', function(req, res) {
   const allMentors = hyf_mentors.getMentorList();
 
   const firstLetter = req.query.startsWith;
   if(!firstLetter) {
      res.send(allMentors);  
   } else {
      const filteredMentors = allMentors.filter(q => q.name.startsWith(firstLetter))
      res.send(filteredMentors);   
   }

});

/** Get /mentors - with provided `params` parameter `name`.
 - returns mentor with given name, or "Not found" if not found.
 e.g GET http://localhost:<3000 or env port num>/mentors/<mentor name here>
**/
app.get("/mentors/:name", function(req, res) {
   const name = req.params.name;
   const mentor = hyf_mentors.getMentorByName(name);
   if (!mentor) {
      res.send(`The mentor with the name '${name.toUpperCase()}' - was not found!`);
   } else {
      res.send(mentor);
   }
});

 /** Get /courses - returns all courses data as JSON
   e.g GET http://localhost:<3000 or env port num>/courses/
 **/
app.get('/courses', function(req, res) {
   const allCourses = hyf_courses.getCourseList();  
   res.send(allCourses);      
});

/** Get /courses - with provided `params` parameter `name`.
 e.g GET http://localhost:<3000 or env port num>/courses/<course name here >
**/
app.get("/courses/:name", function(req, res) {
   const name = req.params.name;
   const course = hyf_courses.getCourseByName(name);
   if (!course) {
      res.send(`The course '${name.toUpperCase()}' - was not found!`);
   } else {
      res.send(course);
   }
});

/********** POST Route **********/
/** POST /mentors - that adds new mentor. You need to pass new mentor data as JSON in request body (Postman can do that), and use middleware express.json() to read req.body.
 e.g. POST http://localhost:<3000 or env port num>/mentors/<enter new mentor data as JSON in postman>
**/
app.post("/mentors", (req, res) => {   
  const newMentor = req.body;
  const respMsg = hyf_mentors.addNewMentor(newMentor);
  res.send(respMsg);       
});

/** POST /courses - that adds new course. You need to pass new course data as JSON in request body (Postman can do that), and use middleware express.json() to read req.body. 
e.g. POST http://localhost:<3000 or env port num>/courses/<enter new course data as JSON in postman>
**/
app.post("/courses", (req, res) => {
  const newCourse = req.body;
  const respMsg = hyf_courses.addNewCourse(newCourse);  
  res.send(respMsg);        
});

/********** PUT Route **********/
/** PUT /mentors - that updates existing mentor data - pass as JSON in request body. 
e.g. PUT http://localhost:<3000 or env port num>/mentors/<enter modified mentor data as JSON in postman>
**/
app.put("/mentors", (req, res) => {
  const modifiedMentor = req.body;  
  const respMsg = hyf_mentors.UpdateMentor(modifiedMentor);
  res.send(respMsg);       
});


