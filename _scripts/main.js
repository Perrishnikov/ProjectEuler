'use strict';

/**
 * The Model. Model stores items and notifies
 * observers about changes.
 */

function Problem ({problem, title, text, link, solution, script}) {
    this.problem = problem,
    this.title = title,
    this.text = text,
    this.link = link,
    this.solution = solution,
    this.script = script,
    this.view = (function(){

    }());
    // console.log(this);
}

Problem.prototype.makeView = function(){
    console.log(this);
    console.log("Hello World");
}

function makePanel(problem){

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
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */
/**
 * The Controller. Controller responds to user actions and
 * invokes changes on the model.
 */
 $(function () {
    var model = new ListModel(['PHP', 'JavaScript']),
        view = new ListView(model, {
            'list': $('#list'),
                'addButton': $('#plusBtn'),
                'delButton': $('#minusBtn')
        }),
        controller = new ListController(model, view);

    view.show();
});
