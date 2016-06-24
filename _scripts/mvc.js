"use strict";

var view = {
    problemViews : function(problem){ //pass in object
        var problemNum = problem.problemNum;
        var title = problem.title;
        var text = problem.text;
        var link = problem.link;
        // var solution = problem.solution;
        var customElements = problem.elements;
        var script = problem.script;

        addPanel();
        addNav();

        function addNav(){
            $('#nav-start').append(" \
            <li><a href='#'> #" + problemNum + " " + title + "</a></li> \
            ");
        };

        function addPanel(){
            $('#panel-start').append(" \
            <div id='problem_" + problemNum + " ' class='panel panel-default problem'> \
            <div class='panel-heading'> \
            <h3 class='panel-title'> #" + problemNum + " " + title + "</h3> \
            </div> \
            <div class='panel-body'> \
            <p>" + text + "</p> \
            <p><a href='" + link + "'</a>" + title + "</p> \
            </div> \
            </div> \
            <form class="form-inline">

            <div class="form-group">
            <label for="exampleInputName2">Name</label>
            <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe">
            </div>
            <div class="form-group">
            <label for="exampleInputEmail2">Email</label>
            <input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">
            </div>
            <button type="submit" class="btn btn-default">Send invitation</button>
            </form>
            ");
        }
    }
}

function getScripts() {
    var folder = "_scripts/";
    var scriptsArray = [];
    console.log("get scripts");

    $.ajax({
        url : folder,
        success: function (data) {
            $(data).find("a").attr("href", function (index,val) {

                if(val.match (/^problem_\d{2,3}.js$/)) { //loops one at a time. Looks for "problem_***.js"
                scriptsArray.push(val);
                }
            });
        },
        complete: function (){
            console.log(scriptsArray);
            scriptsArray.sort();
            console.log(scriptsArray);
            scriptsArray.forEach(function(element) { //loop through each item in array
                var path = "_scripts/" + element;
                $.getScript( path, function() {
                    var valStripped = element.replace(/.js/, ''); //remove ".js"
                    var _thisProblem = window[valStripped]; //find the variables in the DOM to use string as reference
                    view.problemViews(_thisProblem);
                })
            });
        }
    });
}

$(function(){ //loads first
    console.log("load");
    getScripts();
}());

$(window).ready(function() { //loads afer READY
    console.log("ready");
});
