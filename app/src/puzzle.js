var utilities = require('./utilities');
// This will generate the 9x9 Puzzle singleton object
module.exports = new function(){
   var generateRandomNumberBetweenMinAnMax = utilities.generateRandomNumberBetweenMinAnMax;

   var createPuzzle = function(matrix){
	  var matrix = [];
	   // choose a random number between 1 and 9
	   var randomNumber = Math.floor(Math.random()*9 + 1);
	   // We use a staring number, sn
	   for(var sn = randomNumber; sn < randomNumber + 3; sn ++){
	        for(var i = 0 ; i < 3 ; i++ ){
	            var row = [];
	            for(var j = 0; j < 9 ; j++){
	                var num = (sn + j + i*3 )%9 + 1;
	                row.push( num );
	            }
	            matrix.push(row);
	        }
	    }
	    return matrix;
	};

    var shuffleColumns = function(matrix, startCol, endCol){
        var len = matrix.length;
        for(var c = startCol-1 ; c < endCol ; c++ ){
            // generate random column between 1 and len(9)
            var randomColumn = generateRandomNumberBetweenMinAnMax(startCol-1,endCol-1);

            for( var r= 0 ; r < len ; r++ ){
                var temp = matrix[r][c];
                matrix[r][c] = matrix[r][randomColumn];
                matrix[r][randomColumn] = temp;
            }
        }

    };
    var shuffleRows = function(matrix, startRow, endRow){
        var len = matrix.length;
        for(var r = startRow-1 ; r < endRow ; r++ ){
            // generate random column between 1 and len(9)
            var randomRow = generateRandomNumberBetweenMinAnMax(startRow-1,endRow-1);

            for( var c= 0 ; c < len ; c++ ){
                var temp = matrix[r][c];
                matrix[r][c] = matrix[randomRow][c];
                matrix[randomRow][c] = temp;
            }
        }

    };


    var printMatrix = function(matrix, heading){
        if( heading ) {
          $( ".sudoku" ).append("<br />****************" + heading + "****************</br>");
        }

        matrix.forEach(function(eachRow){
            $( ".sudoku" ).append("<br />" + eachRow);
        });


    };

    var shuffle = function(matrix){
        shuffleColumns(matrix,1,3);
        shuffleColumns(matrix,4,6);
        shuffleColumns(matrix,7,9);
        printMatrix(matrix, "After shuffling columns");

        shuffleRows(matrix,1,3);
        shuffleRows(matrix,4,6);
        shuffleRows(matrix,7,9);
        printMatrix(matrix, "After shuffling rows");

    };

    var isEditableCell = function(id){
        return $("#"+id).css("background-color") != "rgb(221, 221, 221)";
    }

    this.model = {
      matrix: [],
      lastDisplayedMatrix : null,
   	  lastClickedCell : null  
    };
   
    this.newInstance = function(){
    	this.model.matrix = createPuzzle();
        shuffle(this.model.matrix);
        this.displayPuzzle(this.model.matrix, false);
        this.model.lastDisplayedMatrix = this.model.matrix;
        return this.model.matrix;
    };

    this.displayPuzzle = function( matrix, isSolved ){

        matrix.forEach(function(eachRow, eachRowIndex){

            // Before iterating each row, generate 3 random indices which show numbers. Rest are left as blank.
            var visiblePositions = [];
            if( !isSolved ) {
                visiblePositions.push(generateRandomNumberBetweenMinAnMax(1,9));
                visiblePositions.push(generateRandomNumberBetweenMinAnMax(1,9));
                visiblePositions.push(generateRandomNumberBetweenMinAnMax(1,9));
            }
            eachRow.forEach(function(expectedNumberInEachCell, eachCellIndex){

               var id = "row" + (eachRowIndex+1) + "col" + (eachCellIndex+1);
               // show the number only when it is in visiblepositions
               if(visiblePositions.indexOf(eachCellIndex) !== -1) {
                   $("#" + id).html( expectedNumberInEachCell );
                   $("#" + id).css( "background-color", "#dddddd" );
               } else {
                   if(isSolved ) {
                     $("#" + id).html( expectedNumberInEachCell );
                     $("#" + id).css( "background-color", "#ffffff" );
                   } else {
                     $("#" + id).html(  "&nbsp;&nbsp;" );
                     $("#" + id).css( "background-color", "#ffffff" );
                   }

               }
            });

        });
    };

};

