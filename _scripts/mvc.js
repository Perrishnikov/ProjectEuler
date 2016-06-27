"use strict";


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
        console.log(n);
        
    });

    Model.getScripts(dfd);
    console.log(dfd);
});





$(window).load(function() { //loads afer READY
    console.log("load");
});
