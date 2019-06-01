/********  test.js  ********/
/* Usage: To test the module functionality in mentors.js & courses.js    
*/
const Mentors = require("./Mentors.js")
const Courses = require("./Courses.js")

const hyf_mentors = new Mentors("./data/mentors.json");
const hyf_courses = new Courses("./data/courses.json");

const allMentors = hyf_mentors.getMentorList();
console.log("all mentors:", allMentors);

const allCourses = hyf_courses.getCourseList();
console.log("all courses:", allCourses);