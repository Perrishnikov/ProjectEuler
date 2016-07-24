"use strict";
// Lets make a problem constructor
// https://davidwalsh.name/javascript-loader

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
    scriptsArray : [],
    makeView : function(_thisProblem) {
            // _thisProblem.problemNum = new Problem(_thisProblem);
            View.problemViews(_thisProblem);
    },
    getScripts : function (dfd){
        $.ajax({
            url : "_scripts",
            success: function (data) {
                console.log("ajax success");
                $(data).find("a").attr("href", function (index,val) {

                    if(val.match (/^problem_\d{2,3}.js$/)) { //loops one at a time. Looks for "problem_***.js"
                        var path = "_scripts/" + val;
                        Controller.scriptsArray.push(path);
                    }
                });

                Controller.scriptsArray.forEach(function(element){
                    // Controller.scriptsArray[0]
                    load.js(element)
                    .then(function() {
                        console.log('Everything has loaded!');
                    }).catch(function() {
                        console.log('Oh no, epic failure!');
                    });
                });


            }
        });
    },
    appendScripts : function (){
        Controller.scriptsArray.forEach(logArrayElements)
    }
}

$(document).ready(function() { //loads first

    Controller.getScripts();

});

var load = (function() {
  // Function which returns a function: https://davidwalsh.name/javascript-functions
  function _load(tag) {
    return function(url) {
      // This promise will be used by Promise.all to determine success or failure
      return new Promise(function(resolve, reject) {
        var element = document.createElement(tag);
        var parent = 'body';
        var attr = 'src';

        // Important success and error for the promise
        element.onload = function() {
          resolve(url);
        };
        element.onerror = function() {
          reject(url);
        };

        // Need to set different attributes depending on tag type
        switch(tag) {
          case 'script':
            element.async = true;
            break;
          case 'link':
            element.type = 'text/css';
            element.rel = 'stylesheet';
            attr = 'href';
            parent = 'head';
        }

        // Inject into document to kick off loading
        element[attr] = url;
        document[parent].appendChild(element);
      });
    };
  }

  return {
    css: _load('link'),
    js: _load('script'),
    img: _load('img')
  }
})();
