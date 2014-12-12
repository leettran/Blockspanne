/* 
 * This script contains the interaction logic of the Task: Blockspanne
 */


// global variables
var flashedCircles;
var selectedCircles = new Array();
var numberOfCirclesToSelect;
var numberOfSelectedCircles = 0;
var taskWillRepeat = true;
var currentTaskPageID;
var nextTaskPageID = "task1";
var canSelect = false;






// to switch to the demo page
function goToDemoPage() {

    try
    {
        $.mobile.changePage('#slideToBlockspanneDemo', {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


// shows the demo example
function onShowDemo() {
    try
    {
        $.mobile.changePage('#blockspanneDemo1', {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


// starts the task blockspanne
function onShowDemoSolving() {
    try
    {
        $.mobile.changePage('#blockspanneDemo6', {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


// slides to the trial page of blockspanne
function onSlideToTrial() {
    try
    {
        $.mobile.changePage('#slideToBlockspanneTrial', {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


// starts the trial of blockspanne
function onShowTrial() {
    try
    {
        $.mobile.changePage('#blockspanneTrial1', {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}

// shows the start hint page
function onShowStartHint() {
    try
    {
        $.mobile.changePage('#startHint', {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


// starts the first subtask
function onStartTask() {
    try
    {
        $.mobile.changePage('#' + nextTaskPageID, {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}



// flashes or highlights given circles
function flashCircles(circlesArray, taskId, taskHintId) {

    try
    {

        // set glob. var.
        flashedCircles = circlesArray;
        numberOfCirclesToSelect = flashedCircles.length;
        currentTaskPageID = taskId;

        // highlight every given circle
        var circleCnt = 0;
        // loop into circles array and highlighten one after another
        function loopIntoarray() {
            setTimeout(function() {
                // build circleId
                var circleId = flashedCircles[circleCnt] + taskId;
                // highlight it           
                highlightClickedCircle(circleId);
                circleCnt++;
                // if still circles are to be flashed
                if (circleCnt < numberOfCirclesToSelect) {
                    // hide highlighting
                    setTimeout(function() {
                        cleanAllSelections();
                        loopIntoarray();
                    }, 1500);
                }
                // if number of circles is reached
                else {
                    // hide highlighting
                    setTimeout(function() {
                        cleanAllSelections();
                        // show hint text
                        $("#" + taskHintId).html("Tippen Sie die Kreise in umgekehrter Reihenfolge an.");
                        $("#" + taskHintId).show("slow");
                        // show counter
                        $(".restCirclesCounter").show();

                    }, 1500);

                    setTimeout(function() {
                        $("#" + taskHintId).hide();
                        // enable selection executing 
                        canSelect = true;
                    }, 4500);
                }
            }, 1500);
        }

        loopIntoarray();



    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


// select a certain circle clicked
function selectCircle(selectedCircle) {

    try
    {
        // only if highlighting is completed!
        if (canSelect)
        {
            // get circle id
            var circleId = selectedCircle.id;
            // increment number of selected circles
            numberOfSelectedCircles++;
            // add selected circle to appr. array
            selectedCircles.push(circleId);
            // lighten or flash selected circle
            highlightClickedCircle(circleId);
            // clean other selection
            cleanPreviousSelection(circleId);
            
            // decrement rest circles counter
        decrementRestCirclesCounter();

            // check if number of circles to be selected is reached
            if (numberOfSelectedCircles === numberOfCirclesToSelect) {

                // if a mistake has been done
                if (mistakeOccured())
                {
                    setTimeout(function() {
                        // check if task will repeat
                        if (taskWillRepeat)
                        {
                            // disable selection
                            canSelect = false;
                            taskWillRepeat = false;
                            // empty selected circles
                            selectedCircles.length = 0;
                            // reset number of selected circles
                            numberOfSelectedCircles = 0;
                            // clean selections
                            cleanAllSelections();
                            
                            var taskRepeatPageID = currentTaskPageID + "Repeat";
                            nextTaskPageID = taskRepeatPageID;
                            $.mobile.changePage('#startHint', {transition: "flip"});

                        }
                        // if task was already repeated
                        else
                        {
                            $.mobile.changePage('#endPage', {transition: "flip"});
                            taskWillRepeat = false;
                            // disable selection
                            canSelect = false;
                        }


                    }, 200);

                }
                // if task was successfull
                else
                {
                    setTimeout(function() {

// disable selection
                        canSelect = false;
                        // reset all circles
                        cleanAllSelections();
                        // empty selected circles
                        selectedCircles.length = 0;
                        // reset number of selected circles
                        numberOfSelectedCircles = 0;
                        // switch to next task
                        var currentPageId = $.mobile.activePage.attr('id');
                        switchToNextTask(currentPageId);

                    }, 200);
                }

            }
        }
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


// switches to the next task
function switchToNextTask(currentPageID) {

    try
    {
        switch (currentPageID) {
            case "task1":
                $.mobile.changePage('#task2', {transition: "none"});
                break;

            case "task1Repeat":
                $.mobile.changePage('#task2', {transition: "none"});
                break;

            case "task2":
                $.mobile.changePage('#task3', {transition: "none"});
                break;

            case "task2Repeat":
                $.mobile.changePage('#task3', {transition: "none"});
                break;

            case "task3":
                $.mobile.changePage('#task4', {transition: "none"});
                break;

            case "task3Repeat":
                $.mobile.changePage('#task4', {transition: "none"});
                break;

            case "task4":
                $.mobile.changePage('#task5', {transition: "none"});
                break;

            case "task4Repeat":
                $.mobile.changePage('#task5', {transition: "none"});
                break;

            case "task5":
                $.mobile.changePage('#endPage', {transition: "none"});
                break;

            case "task5Repeat":
                $.mobile.changePage('#endPage', {transition: "none"});
                break;


        }
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}



// decrements rest circles counter
function decrementRestCirclesCounter(){
    
    try
    {
        var restCircles = numberOfCirclesToSelect - numberOfSelectedCircles;
       $(".restCirclesCounter").html("Noch " + restCircles + " Kreis(e)"); 
    }
    
    catch (error) {
        console.log("An error has been occured! " + error);
    }
}

// called when a circle is selected on the trial example
function selectCircleTrial(selectedCircle) {

    try
    {
        // get circle id
        var circleId = selectedCircle.id;

        // increment number of selected circles
        numberOfSelectedCircles++;
        // add selected circle to appr. array
        selectedCircles.push(circleId);

        // lighten or flash selected circle
        highlightClickedCircle(circleId);
        // clean other selection
        cleanPreviousSelectionTrial(circleId);
        
        // decrement rest circles counter
        decrementRestCirclesCounter();


        // check if number of circles to be selected is reached
        if (numberOfSelectedCircles === numberOfCirclesToSelect) {

            // if a mistake has been done
            if (mistakeOccuredTrial())
            {
                setTimeout(function() {

                    $.mobile.changePage('#trialRetry', {transition: "none"});
                    // reset all circles
                    cleanAllSelectionsTrial();
                    // empty selected circles
                    selectedCircles.length = 0;
                    // reset number of selected circles
                    numberOfSelectedCircles = 0;
                }, 200);

            }
            // if trial was successfull
            else
            {
                setTimeout(function() {

                    $.mobile.changePage('#startTask', {transition: "none"});
                    // reset all circles
                    cleanAllSelectionsTrial();
                    // empty selected circles
                    selectedCircles.length = 0;
                    // reset number of selected circles
                    numberOfSelectedCircles = 0;
                }, 200);
            }

        }




    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


// checks if the selection has a mistake
function mistakeOccured() {

    var mistakeOccured = false;

    try
    {
        for (var i = 0; i < flashedCircles.length; i++) {

            if (flashedCircles[i] + currentTaskPageID !== selectedCircles[flashedCircles.length - (1 + i)])
            {
                mistakeOccured = true;
                break;
            }

        }

        return mistakeOccured;
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


// to compare selected circles and circles should be selected
function mistakeOccuredTrial() {

    var mistakeOccured = false;

    try
    {
        for (var i = 0; i < flashedCircles.length; i++) {

            if (flashedCircles[i] !== selectedCircles[flashedCircles.length - (1 + i)])
            {
                mistakeOccured = true;
                break;
            }

        }

        return mistakeOccured;
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


// highlights clicked circle
function highlightClickedCircle(circleID) {

    try
    {
        $("#" + circleID).css("background-color", "#ffff00");
        $("#" + circleID).css("border", "1px solid #ffcc00");
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}



// cleans previous selection
function cleanPreviousSelection(selectedCircleID) {

    try
    {

        var allCircles = document.getElementsByClassName('kreis');
        for (var i = 0; i < allCircles.length; i++) {
            var tempCirc = allCircles[i];
            var tempCircId = tempCirc.id;

            if (tempCircId !== selectedCircleID) {

                $("#" + tempCircId).css("background-color", "#64C463");
                $("#" + tempCircId).css("border", "1px solid black");

            }
        }
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}

// cleans previous selection
function cleanPreviousSelectionTrial(selectedCircleID) {

    try
    {
        var pageID = $.mobile.activePage.attr('id');
        var allCircles = document.getElementsByClassName('kreis');
        for (var i = 0; i < allCircles.length; i++) {
            var tempCirc = allCircles[i];
            var tempCircId = tempCirc.id;

            if (tempCircId !== selectedCircleID) {

                $("#" + tempCircId).css("background-color", "#64C463");
                $("#" + tempCircId).css("border", "1px solid black");

            }
        }
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


// cleans all selections
function cleanAllSelectionsTrial() {

    try
    {

        var allCircles = document.getElementsByClassName('kreis');
        for (var i = 0; i < allCircles.length; i++) {
            var tempCirc = allCircles[i];
            var tempCircId = tempCirc.id;

            $("#" + tempCircId).css("background-color", "#64C463");
            $("#" + tempCircId).css("border", "1px solid black");

        }
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


// cleans all circles
function cleanAllSelections() {

    try
    {

        var allCircles = document.getElementsByClassName('kreis');
        for (var i = 0; i < allCircles.length; i++) {
            var tempCirc = allCircles[i];
            var tempCircId = tempCirc.id;

            $("#" + tempCircId).css("background-color", "#64C463");
            $("#" + tempCircId).css("border", "1px solid black");

        }
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}