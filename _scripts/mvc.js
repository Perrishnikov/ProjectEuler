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

// function Model() {
//     // this._problemNum = problemNum;
//     // console.log(problem);
//     // this._title = title;
// }

var Model = {
    scriptsArray : [],
    getScripts : function (dfd){
        $.ajax({
            url : "_scripts",
            success: function (data) {
                console.log("running ajax");
                $(data).find("a").attr("href", function (index,val) {

                    if(val.match (/^problem_\d{2,3}.js$/)) { //loops one at a time. Looks for "problem_***.js"
                    Model.scriptsArray.push(val);
                    }
                });
            },
            complete: function (){
                // console.log(scriptsArray);
                Model.scriptsArray.sort();
                console.log(Model.scriptsArray);
                Model.scriptsArray.forEach(function(element) { //loop through each item in array
                    var path = "_scripts/" + element;
                    $.getScript( path, function() {
                        var valStripped = element.replace(/.js/, ''); //remove ".js"
                        var _thisProblem = window[valStripped]; //find the variables in the DOM to use string as reference
                        // return Model.scriptsArray;
                        dfd.resolve(Model.scriptsArray);
                    })
                });
            }
        });
    }
}


$(document).ready(function() { //loads first
    console.log("ready");
    var dfd = $.Deferred();
    dfd.done(function( n ) {
        var array = n;
        console.log(n);
        array.forEach(function(i){
            View.problemViews(i);
        });

    });

    Model.getScripts(dfd);

});





$(window).load(function() { //loads afer READY
    console.log("load");
});
