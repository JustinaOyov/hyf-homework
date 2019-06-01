# hyf-class09-02
Code example used on our class


# Homework

Homework have 2 tasks:

### First task
First task is to practice creating new Npm project, installing dependencies and writing `express` routes.

1. Create new empty folder. Open it in Visual Studio Code. Open the terminal.
2. Initialize new Npm project, install `express` library, create `index.js` with code to run new express server on port `3000`.
3. Add 2 routes to your `index.js`:
  - GET `/numbers/add?first=<number here>&second=<number here>`. In response send sum (first + second).
  - GET `/numbers/multiply/<first number here>/<second number here>`. in response send multiplication (first * second).
  
Hints:
- Find express documentation online.
- Use `req.query` and `res.params` properties on `req` object.
- Check code we created today in class as reference.

### Second task
Second task is to extend app that each student wrote in class with new functionality.

In class each of you wrote a route `GET /mentors` that returns all mentors. Now lets write more routes:

- `GET /mentors/<name here>` - that returns mentor with given `name`, or "Not found" if not found.
- `POST /mentors` - that adds new mentor. You need to pass new mentor data as JSON in request body (Postman can do that), and use middleware `express.json()` to read `req.body`. Check today's code we wrote on class as reference.
- `GET /courses` - get all courses.
- `GET /courses/<name here>` - that returns course with given `name`, or "Not found" if not found.
- `POST /courses`- that adds new course. You need to pass new course data as JSON in request body (Postman can do that), and use middleware `express.json()` to read `req.body`. Check today's code we wrote on class as reference.

Hints:
- Use code we wrote on class as reference, but avoid copy-paste. You can learn much better by writing code by hand, than by just copy-pasting it.
- If you are missing some functionality in your `Mentors` and `Courses` classes, you need to add it.
- I provided example implementation of `Mentors` and `Courses` to use if you didn't do the previous homework. You can fin it in this repository, in folder `homework`.
