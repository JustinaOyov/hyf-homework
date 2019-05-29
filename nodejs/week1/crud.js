/*****            crud.js (module)                 
/* Description: HYF library (Courses & Mentors) - CRUD operations  
******/

const fs = require('fs');  // node.js file system module
// Insert data files containing: 'courses' & 'mentors' data objects
const courses = require('./data/courses.json'); 
const mentors = require('./data/mentors.json'); 

class Courses {
  constructor () {  
    // HYF courses - data
    this.courses = courses;
  }
    /***** define class Methods *****/
    // method 1: Create/add a new course to HYF courses
    addCourse(newCourse) {
      // return true if course already exist
      const isCourse = this.courses.some(course => course.name.toLowerCase() === newCourse.name.toLowerCase());
              
      if (isCourse === false) {
         // Add new course info to the end of the object array - in memory
         this.courses.push(newCourse);               
         // this step writes the data object array to file
         let data = JSON.stringify(this.courses, null, 2);
         fs.writeFile('./data/courses.json', data, (err) => {
            if (err) throw err;             
         });
        return(`New Course '${newCourse.name}' - Successfully added!`);

      } else {
        return(`Cannot add '${newCourse.name}' - Course already exists!`);
      }      
    }

    // method 2: return list of all HYF courses
    getCourseList() {
      if (this.courses.length === 0) return("No courses found!");
          return(this.courses);  
    }
  
    // method 3: Read/return a course info OR return 'no course found' message   
    getCourse(courseName) {
      const isCourse = this.courses.filter(course => course.name.toLowerCase() === courseName.toLowerCase());
      if (isCourse.length === 0) return(`No match found - '${courseName}' does not exist!`);
        return(isCourse);        
    }

    // To do: method 4: Update/edit existing course
    // To do: method 5: Delete/remove existing course from file

};

class Mentors {
  constructor () {  
    // HYF mentors - data
    this.mentors = mentors;   
  }
    /***** define class Methods *****/  
    // method 1: Create/add a new mentor to HYF Mentor List
    addMentor(newMentor) {
      // return true if course already exist
      const isMentor = this.mentors.some(mentor => mentor.name.toLowerCase() === newMentor.name.toLowerCase());
              
      if (isMentor === false) {
         // Add new mentor info to the end of the object array - in memory
         this.mentors.push(newMentor);               
         // this step saves the data to mentors.json file
         let data = JSON.stringify(this.mentors, null, 2);
         fs.writeFile('./data/mentors.json', data, (err) => {
            if (err) throw err;                           
         });
        return(`New Mentor '${newMentor.name}' - Successfully added!`);
      } else {
        return(`Cannot add '${newMentor.name}' - Mentor already exists!`);
      }      
  }

  // method 2: Read/return list of all HYF mentors
    getMentorList() {  
      if (this.mentors.length === 0) return("No Mentors found!");
          return(this.mentors); 
    }

    // method 3: Read/return a mentor info OR return 'no mentor found' message   
    getMentor(mentorName) {
      const isMentor = this.mentors.filter(mentor => mentor.name.toLowerCase() === mentorName.toLowerCase());
      
      if (isMentor.length === 0) return(`No match found - '${mentorName}' does not exist!`);
        return(isMentor);        
    }

 // method 4: Update/edit existing mentor
  editMentor(mentorName) {
    // get the index of the mentor in the list
    const mentorIdx = this.mentors.findIndex(mentor => (mentor.name.toLowerCase() === mentorName.name.toLowerCase())); 
    
    if (mentorIdx >= 0) {
      // update mentor info - in memory
      this.mentors[mentorIdx] = mentorName;

      // save updated mentor info to file      
      let data = JSON.stringify(this.mentors, null, 2);
      fs.writeFile('./data/mentors.json', data, (err) => {
          if (err) throw err;         
      });
      return(`Mentor '${mentorName.name}' - Successfully updated!`);  
    } else {
      return(`Cannot update '${mentorName.name}' - Mentor does not exist!`);
   }       
  } 

  // method 5: Delete/remove existing mentor data from file
  deleteMentor(mentorName) {
    // delete mentor if mentor exists
    if (this.mentors.some(mentor => mentor.name.toLowerCase() === mentorName.toLowerCase())) {
      this.mentors = this.mentors.filter(mentor => mentor.name.toLowerCase() !== mentorName.toLowerCase()); 
            
      // delete mentor from data file      
      let data = JSON.stringify(this.mentors, null, 2);
      fs.writeFile('./data/mentors.json', data, (err) => {
        if (err) throw err;      
      });
      return(`Mentor '${mentorName}' - Successfully deleted!`);
    } else {
      return(`Cannot delete '${mentorName}' - Mentor does not exist!`);     
    }       
  }

}; 
// Export modules to make it public to other files  
module.exports = {
  Courses,
  Mentors
}  

