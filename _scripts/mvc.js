 'use strict';
 /**
  * The Model. Model stores items and notifies
  * observers about changes.
  */

 function Problem ({problem, title, text, link, solution, elements, script}) {
     this.problem = problem,
     this.title = title,
     this.text = text,
     this.link = link,
     this.solution = solution,
     this.script = script,
     this.elements = elements
 }

 // Problem.prototype.makeView = function(){
 //     console.log(this);
 //     console.log("Hello World");
 // }

 /**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */

 function ProblemView(problem){
     this.problem = problem,
     this.title = title,
     this.text = text,
     this.link = link,
     this.solution = solution,
     this.elements = elements

     var problemName = "problem_" + problem;
     console.log(problemName);

     $('#start').append(' \
     <div id=' + problemName + ' class="panel panel-default problem"> \
         <div class="panel-heading"> \
             <h3 class="panel-title"> #' + problem + ' ' + title + '</h3> \
         </div> \
         <div class="panel-body"> \
             <p>' + text + '</p> \
             <p>' + link + '</p> \
         </div> \
     </div> \
     ');
 }

/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
 var view = new ProblemView (problem_03);
 
 $(function () {
    // var model = new Problem (['PHP', 'JavaScript']),

        //  {
        //     // 'list': $('#list'),
        //     // 'addButton': $('#plusBtn'),
        //     // 'delButton': $('#minusBtn')
        // }),
        // controller = new ListController(problem_3, view);

    // view.show();
});
