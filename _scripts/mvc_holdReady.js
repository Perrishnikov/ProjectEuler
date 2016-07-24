"use strict";

var View = {
    problemViews : function(problem){ //pass in object
        var problemNum = problem.problemNum;
        var title = problem.title;
        var text = problem.text;
        var link = problem.link;
        // var solution = problem.solution;
        var customElements = problem.elements;
        var script = problem.script;
        var inputPrimaryName = problem.inputPrimaryName;
        var inputSecondaryName = problem.inputSecondaryName || null;
        var placeholderPrimary = problem.placeholderPrimary || "default";
        var placeholderSecondary = problem.placeholderSecondary || "default";

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
                    <h3 class='panel-title'># " + problemNum + " <a href='" + link + "'>" + title + "</a></h3> \
                </div> \
                \
                <div class='panel-body'> \
                    <p>" + text + "</p> \
                    <form class='form-inline'> \
                        <div class='form-group'> \
                            <label for='" + inputPrimaryName + "'>" + inputPrimaryName + "</label> \
                            <input type='text' class='form-control' id='" + inputPrimaryName + "' placeholder='" + placeholderPrimary + "'> \
                        </div> \
                        <div class='form-group'> \
                            <label for='" + inputSecondaryName + "'>" + inputSecondaryName + "</label> \
                            <input class='form-control' id='" + inputSecondaryName + "' placeholder='" + placeholderSecondary + "'> \
                        </div> \
                        <button type='submit' class='btn btn-default'>Submit</button> \
                        <button type='reset' class='btn btn-default'>Reset</button> \
                    </form> \
                </div> \
            </div> \
            ");
        }
    }
}

var Controller = {
    getScripts : function (){
        $.ajax({
            url : "_scripts",
            error : function (){
                console.error("ajax ERROR");
            },
            success: function (data) {
                console.log("ajax SUCCESS");
                $(data).find("a").attr("href", function (index,val) {
                    if(val.match (/^problem_\d{2,3}.js$/)) { //loops one at a time. Looks for "problem_***.js"
                        var path = "_scripts/" + val;
                        $.getScript( path, function() {
                            var valStripped = val.replace(/.js/, ''); //remove ".js"
                            var _thisProblem = window[valStripped]; //find the variables in the DOM to use string as reference
                            View.problemViews(_thisProblem);
                        });
                    }
                });
            },
            complete : function (){
                console.log("ajax COMPLETE");
                $.holdReady( false );
            }
        });
    }
}

$.holdReady( true ); //loads all problem scripts 
Controller.getScripts();

$(document).ready(function() { //loads first
    console.log("ready");

});
