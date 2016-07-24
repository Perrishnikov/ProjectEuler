"use strict";

function Problem ({problemNum, title, text, link, solution, elements, script}) {
    this.problemNum = problemNum,
    console.log("NUM----------------------" + problemNum);
    this.title = title,
    this.text = text,
    this.link = link,
    this.solution = solution,
    this.elements = elements,
    this.script = script,

    console.log("This is a Problem!");
    console.log(typeof this);
  //   console.log(problem_03);
}
