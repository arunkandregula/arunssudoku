var puzzle = require('./puzzle');
// register event handlers necessary for UI interaction
module.exports = function(){

        $("#newPuzzleButton").bind('click', function(){
            $("#congratulationsDiv").hide();
            puzzle.model.lastDisplayedMatrix = puzzle.newInstance();
        });

        $("#solveButton").bind('click', function(){
            puzzle.displayPuzzle(puzzle.model.lastDisplayedMatrix, true);
        });

        $("#validateButton").bind('click', function(){
            var isSolved = true;
            puzzle.model.lastDisplayedMatrix.forEach(function(eachRow, eachRowIndex){

                eachRow.forEach(function(expectedNumberInEachCell, eachCellIndex){

                    var id = "row" + (eachRowIndex+1) + "col" + (eachCellIndex+1);

                    var actualNumber = $("#" + id).html();
                    if(actualNumber != expectedNumberInEachCell){
                    	// if already being edited 
                    	if( $("#" + id).html().indexOf("input") !== -1) {
                    		$("#textBox").css("background-color","red")
                    	}
                        $("#" + id).css("background-color","red");
                        isSolved = false;

                    } else {
                        $("#" + id).css("background-color","white");
                    }
                });

            });
            if( isSolved ){
              $("#congratulationsDiv").show();
            }

        });


	    var isEditableCell = function(id){
	        return $("#"+id).css("background-color") != "rgb(221, 221, 221)";
	    }

        $(".cell").bind('click',function(event){
            var id = event.target.id;
            var clickedCell = $("#"+id);
            var currentValue = clickedCell.html();
            if(isEditableCell(id)) {
                var lastLastClickedCell = puzzle.model.lastClickedCell;
                if( lastLastClickedCell ) {
                    lastLastClickedCell.html( $("#textBox").val() );
                    $("#textBox").remove();
                    lastLastClickedCell.css("background-color","white");
                }

                var isValidValue = function(currentValue){
                    return currentValue.length == 1;
                }
                var textBoxStr = '<input type="tel" id="textBox" class="editTextBox" size="1" maxlength="1" autofocus="autofocus" >';
                if( isValidValue(currentValue) ){
                    textBoxStr = '<input type="tel" id="textBox" class="editTextBox" size="1" maxlength="1" autofocus="autofocus" value="'+ currentValue +'">';
                }
                clickedCell.html(textBoxStr);
                puzzle.model.lastClickedCell = clickedCell;
                $('input[autofocus="autofocus"]').focus()
            }

        });


    };