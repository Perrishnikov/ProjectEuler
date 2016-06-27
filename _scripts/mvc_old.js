 'use strict';
 /**
  * The Model. Model stores items and notifies
  * observers about changes.
  */

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

 /**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */

 function problemView(problem){
     var problemNum = problem.problemNum;
     var title = problem.title;
     var text = problem.text;
     var link = problem.link;
     var solution = problem.solution;
     var elements = problem.elements;
     var script = problem.script;

    //  console.log(problem);
     function addNav(){

     };

     (function addPanel(){
         $('#start').append(" \
             <div id='problem_" + problemNum + " ' class='panel panel-default problem'> \
                 <div class='panel-heading'> \
                     <h3 class='panel-title'> #" + problemNum + " " + title + "</h3> \
                 </div> \
                 <div class='panel-body'> \
                     <p>" + text + "</p> \
                     <p><a href='" + link + "'</a>" + title + "</p> \
             </div> \
         </div> \
         ");
     }());
 }

/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */


$( document ).ready(function() {
    // console.log( "ready!" ); //same as $(function)



});

$( window ).load(function() {
    // console.log("load"); //loads afer READY
    // console.log(scriptsArray);

});


$(function () {
getScripts();
// problemView(problem_03);
// console.log("auto");
}());

function getScripts() {
	var folder = "_scripts/";
    var scriptsArray = "problem_03";

    var path = "_scripts/" + scriptsArray + ".js";

    $.getScript( path, function( data, textStatus, jqxhr ) {
        console.log(typeof(data));
        var thisdata = new Problem(data);
        // var hello = problem_03;
        console.log(thisdata);
        problemView(thisdata);

        // console.log(problem_03);
    })
    .done(function( script, textStatus ) {
        // console.log( script );
        // problemView($.parseHTML(script));
        console.log(typeof(scriptsArray[0]));
      })
    ;

	// $.ajax({
	// 	url : folder,
	// 	success: function (data) {
	// 		$(data).find("a").attr("href", function (index,val) { //PROBLEM_03 is not defined in here
    //             console.log("AJAX DAtA", data);
    //
	// 			if(val.match (/^problem_\d{2,3}.js$/)) { //loops one at a time
    //
    //                 var valStripped = val.replace(/.js/, ''); //remove ".js"
    //                 // // var thisProblem = valStripped;
    //                 // var valScript = '<script src="'+ folder + val + '"></script>';
    //                 //
    //                 scriptsArray.push(valStripped);
    //                 console.log("pushed: " + valStripped);
    //                 // $("script").last().after(valScript); //find last script tag - append it to DOM
    //                 // console.log(scriptsArray);
    //                 //
    //                 // for (var i = 0; i < scriptsArray.length; i++) {
    //                 //     console.log("in the loop: " + scriptsArray[i]);
    //                 // }
	// 			}
	// 		});
	// 	},
	// 	complete: function (){
    //         // scriptsArray.forEach(function(item){console.log("Scripts Array Item: ", item)});
    //         for (var i = 0; i < scriptsArray.length; i++) {
    //             console.log("scriptsArray[i]: ", scriptsArray[i]);
    //
    //
    //             var path = "_scripts/" + scriptsArray[i] + ".js";
    //
    //             $.getScript( path, function( data, textStatus, jqxhr ) {
    //                 // console.log( textStatus + " on: " + name); // Success
    //
    //                 // var hello = problem_03;
    //                 console.log(data);
    //                 problemView(problem_02);
    //                 // console.log(problem_03);
    //             });
    //         }
    //     }
	// });
}

function makeProblem() {

}
