/*****            Mentors.js                 
 Description: HYF Mentors - CRUD operations  
******/
const fs = require('fs');

class Mentors {
  constructor (fileName) {  
    // HYF mentors - data
     this.fileName = fileName;   
  }

  /** method 1: get list of all HYF mentors **/
  getMentorList() {  
     const fileData = fs.readFileSync(this.fileName).toString();
     const allMentors = JSON.parse(fileData);
     return(allMentors);
  }

  /** method 2: Returns mentor if found, undefined otherwise **/
  getMentorByName(mentorName) {
     const allMentors = this.getMentorList();
     return allMentors.find(q => q.name.toLowerCase() === mentorName.toLowerCase());
  }
   
  /** method 3: add a new mentor to HYF Mentor List **/
  addNewMentor(newMentor) {
      // return true if course already exist
      if(this.getMentorByName(newMentor.name)) {
         return(`The Mentor '${newMentor.name}' - already esists!`);
      }
      const allMentors = this.getMentorList();
      allMentors.push(newMentor);
      // save new mentor to file
      const newFileData = JSON.stringify(allMentors, null, 4);
      fs.writeFileSync(this.fileName, newFileData);
      return(`The new Mentor '${newMentor.name}' - was added successfully!`);      
  }

  /** method 4: Update existing mentor **/
  UpdateMentor(updatedMentor) {
    if(this.getMentorByName(updatedMentor.name)) {

      const allMentors = this.getMentorList();        
      const mentorIdx = allMentors.findIndex(q => (q.name.toLowerCase() === updatedMentor.name.toLowerCase()));  
      
      if (mentorIdx >= 0) {
          // update mentor
          allMentors[mentorIdx] = updatedMentor;
          
          // save the modified mentor to file
          const newFileData = JSON.stringify(allMentors, null, 4);
          fs.writeFileSync(this.fileName, newFileData);
          return(`The Mentor '${updatedMentor.name}' - was updated successfully!`); 
      }else { 
          return (`The Mentor '${updatedMentor.name}' - does not exist!`);     
      } 
    }
  }  

}; 
// Export modules to make it public to other files  
module.exports = Mentors;
