/********  app.js  ********  
   Description: HackYourFuture Courses CRUD App 
   Allows users to find HYF courses and mentors. 
**/ 
const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require('body-parser'); 

// Insert modules/files containing: 'courses' & 'mentors' 
const Courses = require("./Courses.js");
const Mentors = require("./Mentors.js");
const hyf_mentors = new Mentors("./mentors.json");  
const hyf_courses = new Courses("./courses.json"); 

// initialise Port
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false }));
// parse application/json
app.use(bodyParser.json());

// HYF app:/root
app.get('/', (req, res) => res.send('Welcome to HYF Course app using express!'));

/****** Courses Route  ******/
router.route('/courses')
    // get courses: - GET http://localhost:<3000 or env port num>/api/courses?name=<course name here>
  .get((req, res) => {
    // get courses (by `name`)
      if(req.query.name) {
        const course = hyf_courses.getCourseByName(req.query.name);        
        if(course != undefined){
          res.status(201);
          res.send(course);
        } else {
          res.status(400);
          res.send(`course does not exist: '${req.query.name}'`);
        }      
      } else {
        // get all courses including mentors 
          const allCourses = hyf_courses.getList();          
          if (allCourses.length > 0) {    
             res.status(201);
             res.send(allCourses);
          } else {
            res.status(500);
            res.send(`sorry can't find courses in data file!`);  // no courses found in courses.json data file
          }
      }
  })      
  .post((req, res) => {   
    // add courses: - POST http://localhost:<3000 or env port num>/api/courses/<new course as JSON> 
      if (hyf_courses.addNewCourse(req.body)) {
         res.status(201);
         res.send(`course added: '${req.body.name}'`);
      } else {
         res.status(400);
         res.send(`failed to add course: '${req.body.name}'`);
      }
  })    
  .put((req, res) => {  
    // edit courses: - PUT http://localhost:<3000 or env port num>/api/courses/<enter edited courses as JSON>  
      if(hyf_courses.editCourses(req.body)) {
         res.status(201);
         res.send(`course updated successfully: '${req.body.name}'`);
      } else {
         res.status(400);
         res.send(`course not found: '${req.body.name}'`);
      }  
  })
  .delete((req, res) => {
    // delete course: - DELETE http://localhost:<3000 or env port num>/api/mentors?name=<deleted courseName> 
    //console.log(req.query.name);
    if (hyf_courses.deleteCourses(req.query.name)) {
       res.status(201);
       res.send(`course deleted successfully: '${req.query.name}'`);
    } else {
      res.status(400);
      res.send(`course not found: '${req.query.name}'`);
    }
  });


/****** Mentors Route  ******/
router.route('/mentors')  
  .get((req, res) => { 
    // get mentors: - GET http://localhost:<3000 or env port num>/api/mentors?startsWith=<letter here>      
      const allMentors = hyf_mentors.getAllMentors();
      if(req.query.startsWith) {
          const firstLetter = req.query.startsWith; 
          const foundMentors = allMentors.filter(q => q.name.toLowerCase().startsWith(firstLetter.toLowerCase()));
          if (foundMentors.length > 0) {
              res.status(201);
              res.send(foundMentors);  
          } else {
              res.status(400);
              res.send(`not found mentors with names starting with: '${req.query.startsWith.toUpperCase()}'`)
          }
      } else if(req.query.name) {
         // get mentors (by `name`) - GET http://localhost:<3000 or env port num>/api/mentors?name=<mentorName here>
          const mentor = hyf_mentors.getMentorByName(req.query.name);         
          if(!mentor){
              res.status(400);
              res.send(`mentor does not exist: '${req.query.name}'`);
          } else {
              res.status(201);
              res.send(mentor);
          }
      } else {
        // get all mentors        
        if (allMentors.length > 0) {    
           res.status(201);
           res.send(allMentors);
        } else {
          res.status(500);
          res.send(`sorry can't find mentors in data file!`);  // no mentor found in mentor.json data file
        }
      }
   })   
  .post((req, res) => {  
       // add new mentor: - POST http://localhost:<3000 or env port num>/api/mentors/<new mentor as JSON > 
      if (hyf_mentors.addNewMentor(req.body)) {
        res.status(201);
        res.send(`mentor mentor added: '${req.body.name}'`);
      } else {
        res.status(400);
        res.send(`failed to add mentor: '${req.body.name}'`);
      }  
  })     
  .put((req, res) => {  
      // edit mentor: - PUT http://localhost:<3000 or env port num>/api/mentors/<edited mentor as JSON>  
      if(hyf_mentors.editMentors(req.body)) {
        res.status(201);
        res.send(`mentor updated successfully: '${req.body.name}'`);
      }else{
        res.status(400);
        res.send(`mentor not found: '${req.body.name}'`);
      }      
  })
  .delete((req, res) => {
    // delete mentor: - DELETE http://localhost:<3000 or env port num>/api/mentors?name=<deleted mentorName> 
    if (hyf_mentors.deleteMentors(req.query.name)) {
       res.status(201);
       res.send(`mentor deleted successfully: '${req.query.name}'`);
    } else {
      res.status(400);
      res.send(`mentor not found: '${req.query.name}'`);
    }
  });

app.use('/api',router);
// start the server
app.listen(port, () => console.log(`HYF course app listening on port - http://localhost:${port}`));
