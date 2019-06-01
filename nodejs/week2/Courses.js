/*****            Courses.js                 
 Description: HYF Courses - CRUD operations  
******/
const fs = require('fs');  // node.js file system module

class Courses {
  constructor (fileName) {  
     // HYF courses - data
     this.fileName = fileName;
  }
    /***** define class Methods *****/

   // method 1: get list of all HYF courses
  getCourseList() {
     const fileData = fs.readFileSync(this.fileName).toString();
     const allCourses = JSON.parse(fileData);
     return(allCourses);      
  }

  // method 2: // Returns course if found, undefined otherwise
  getCourseByName(courseName) {
     const allCourses = this.getCourseList();
     return allCourses.find(q => q.name.toLowerCase() === courseName.toLowerCase());    
  }

  // method 3: Create/add a new course to HYF courses
  addNewCourse(newCourse) {
    // return true if course already exist
     if (this.getCourseByName(newCourse.name)){
       return (`The course '${newCourse.name}' - already exists!`);
     }
     const allCourses = this.getCourseList();
     allCourses.push(newCourse);

     const newFileData = JSON.stringify(allCourses, null, 4);
     fs.writeFileSync(this.fileName, newFileData);
     return(`The new course '${newCourse.name}' - was added successfully!`);

  }     

    // To do: method 4: Update/edit existing course
    // To do: method 5: Delete/remove existing course from file

};

// Export modules to make it public to other files  
module.exports = Courses; 

