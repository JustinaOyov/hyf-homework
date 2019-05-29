/*****            app.js (CRUD App - with Node.js & ExpressJS)  
               
/* Description: CRUD App - Allows users to find HackYourFuture courses and mentors. 
   Usage: To test HYF CRUD operations defined in 'crud.js' via web browser 
          using node monitor (nodemon)
    
          - start server in terminal (i.e  nodemon app.js) 
          - enter the following CRUD requests in web browser
            (the root domain URL: http://localhost:3001)

CRUD requests (HYF Courses):
  1. create a new course, enter: '/course/add/course name/course duration'
  2. read or get list of courses, enter: '/course/list'
  3. read or get one course info, enter: '/course/search/course name'

CRUD requests (HYF Mentors): (Note: 'courses' is an array)
  1. create/add a new mentor, enter: '/mentor/add/mentor name/?array=course1&array=course2' etc..
  2. read or get list of mentors, enter: '/mentor/list'
  3. read or get one mentor info, enter: '/mentor/search/mentor name'
  4. update mentor information, enter: '/mentor/edit/mentor name/?array=course1&array=course2' etc..
  4. delete a mentor, enter: '/mentor/del/mentor name'
*****/

// import Courses & Mentors modules  
const hyflib = require('./crud.js');
// instantiate the courses & mentor class modules
const hyf_courses = new hyflib.Courses();
const hyf_mentors = new hyflib.Mentors();

// Server setup - with expressJS 
const server_port = 3001;  // the root domain URL: http://localhost:3001
// create an express app
const express = require('express');
const app = express(); 
// listen to connections on certain ports
console.log("server is running...");
const server = app.listen(server_port, listening);
function listening() {
  console.log(`localhost: port ${server_port} listening...`);
}

/***** HYF Courses - CRUD Requests *****/
// step 1: Create/add - a new course
app.get('/course/add/:name/:duration', addCourse);
function addCourse(request, response) {
  let newCourse = {name: request.params.name, duration: request.params.duration}; 
  response.send(hyf_courses.addCourse(newCourse));
}

// step 2: Read - Course List
app.get('/course/list', sendCourseList);
function sendCourseList(request, response) {
  response.send(hyf_courses.getCourseList());
}

// step 3: Read - a course info
app.get('/course/search/:name', sendCourse);
function sendCourse(request, response) {
  let courseName = request.params.name;  
  response.send(hyf_courses.getCourse(courseName));  
}

/***** HYF Mentors - CRUD Requests *****/
// step 1: Create/add - a new mentor
//Note: the Mentor 'courses' is an array - use the query string:
// '/?array=course1&array=course2' etc.. to add courses to array 
app.get('/mentor/add/:name/', addMentor);
function addMentor(request, response) {
  let newMentor = {name: request.params.name, courses: request.query.array}; 
  console.log(newMentor);
  response.send(hyf_mentors.addMentor(newMentor));
}

// step 2: Read - Mentors list
app.get('/mentor/list', sendMentorList);
function sendMentorList(request, response) {
  response.send(hyf_mentors.getMentorList());
}

// step 3: Read - a mentor info
app.get('/mentor/search/:name', sendMentor);
function sendMentor(request, response) {
  let mentorName = request.params.name;
  response.send(hyf_mentors.getMentor(mentorName));
}

// step 4: Update/edit - a mentor
//Note: the Mentor 'courses' is an array - use the query string:
// '/?array=course1&array=course2' etc.. to add courses to array 
app.get('/mentor/edit/:name/', editMentor);
function editMentor(request, response) {
  let modifiedMentor = {name: request.params.name, courses: request.query.array}; 
  console.log(modifiedMentor);
  response.send(hyf_mentors.editMentor(modifiedMentor));
}

// step 5: Delete - a mentor
app.get('/mentor/del/:name', deleteMentor);
function deleteMentor(request, response) {
  let mentorName = request.params.name;
  response.send(hyf_mentors.deleteMentor(mentorName));
}

/*// Test data
// 3. CREATE: Add a new course
const newCourse =   {
  name: 'Java',
  duration: '4weeks' 
};

// 4. UPDATE: Edit existing mentor info
const mentor =  {
  name: "Benjamin",
  courses: ['HTML/CSS', 'JS', 'Database'] 
};*/



