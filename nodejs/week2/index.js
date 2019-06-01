/********  index.js  ********/
 const express = require("express");
 const app = express();
 app.use(express.json());

 const port = process.env.PORT || 3000;
 app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));

 /**** First Task - Express Route Tutorial ****/

/** GET /numbers/add?first=<number here>&second=<number here>. 
    In response send sum (first + second).
**/
app.get("/numbers/add", (req, res) => {
  const firstNum = parseInt(req.query.first);
  const secondNum = parseInt(req.query.second);  
 
  if (req.params) {
    const result = firstNum + secondNum;
    res.send(`${firstNum} + ${secondNum} = ${result}`);
  }else {   
    res.send("Specify 2 numbers to Add!");
  }
});

/** GET /numbers/multiply/<first number here>/<second number here>. 
    In response send multiplication (first * second).
**/
app.get("/numbers/multiply/:first/:second", (req, res) => {
  const firstNum = parseInt(req.params.first);
  const secondNum = parseInt(req.params.second); 
  
  if (req.params) { 
    const result = firstNum * secondNum;
    res.send(`${firstNum} * ${secondNum} = ${result}`);
  } else {   
    res.send("Specify 2 numbers to multiply!");
  }
  
});

