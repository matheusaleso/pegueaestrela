document.addEventListener("DOMContentLoaded", () =>{
    const square = 40; // tamanho de cada quadrado no tabuleiro
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const row = 12; // quantidade de linhas do tabuleiro
    const column = 24; // quantidade de colunas do tabuleiro
    var board = new Board(row, column);
    var path = new Path(board.character, board.star);

    window.startGrid = function(){
        drawGrid();
    }

    window.admissibleHeuristic = function(){
        var lists = document.getElementById("heuristicAdmissible");
        var tree = document.getElementById("heuristicAdmissibleTree");
        lists.style.visibility = "visible";
        tree.style.visibility = "visible";
        var response = path.aStar(true);
        if(response == 0){
            document.getElementById("message").textContent = "Algoritmo sem solução!";
        } else{
           drawPath(response, "purple");
        }
    }

    window.notAdmissibleHeuristic = function(){
        var lists = document.getElementById("heuristicNonAdmissible");
        var tree = document.getElementById("heuristicNonAdmissibleTree");
        lists.style.visibility = "visible";
        tree.style.visibility = "visible";
        var response = path.aStar(false);
        if(response == 0){
            document.getElementById("message").textContent = "Algoritmo sem solução!";
        } else{
           drawPath(response, "blue");
        }
    }

    function drawGrid(){
        for(var i=0;i<row;i++){
            for(var j=0;j<column;j++){
                if(board.grid[i][j].type == 0){
                    drawSquare(j,i);
                }
                else {
                    if(board.grid[i][j].type == 1){
                        drawObstacle(j,i);
                    }
                    else {
                        if(board.grid[i][j].type == 2){
                            drawStar(j,i);
                        }
                        else {
                            if(board.grid[i][j].type == 3){
                                drawCharacter(j,i);
                            }
                        }
                    }
                }
            }
        }
    }

    function drawSquare(column,row){ 
        context.fillStyle = "rgb(49, 143, 58)";
        context.strokeStyle = "white";
        context.fillRect(column * square, row * square, square, square);
        context.strokeRect(column * square, row * square, square, square);
    }

    function drawPathSquare(column,row, color){ 
        context.fillStyle = color;
        context.strokeStyle = "white";
        context.fillRect(column * square, row * square, square, square);
        context.strokeRect(column * square, row * square, square, square);
    }

    function drawCharacter(column,row){ 
        var imageObj = new Image();
        imageObj.onload = function() {
          context.drawImage(this, column * square, row * square,35,35);
        };
        imageObj.src = "../img/anaEstela.png";
        context.fillStyle = "rgb(49, 143, 58)";
        context.strokeStyle = "white";
        context.fillRect(column * square, row * square, square, square);
        context.strokeRect(column * square, row * square, square, square);
    }

    function drawStar(column,row){ 
        var imageObj = new Image();
        imageObj.onload = function() {
          context.drawImage(this, column * square, row * square,35,35);
        };
        imageObj.src = "../img/estrela.png";
        context.fillStyle = "rgb(49, 143, 58)";
        context.strokeStyle = "white";
        context.fillRect(column * square, row * square, square, square);
        context.strokeRect(column * square, row * square, square, square);
    }

    function drawObstacle(column,row){ 
        var imageObj = new Image();
        imageObj.onload = function() {
          context.drawImage(this, column * square, row * square,35,35);
        };
        imageObj.src = "../img/obstaculo1.png";
        context.fillStyle = "rgb(49, 143, 58)";
        context.strokeStyle = "white";
        context.fillRect(column * square, row * square, square, square);
        context.strokeRect(column * square, row * square, square, square);
    }

    function drawPath(response, color){
        for(var i=0; i < response.length; i++){
            var row = response[i].row;
            var column = response[i].column;
           if(board.grid[row][column].type == 2){
              drawStar(column,row);
           } else {
            if(board.grid[row][column].type == 3){
              drawCharacter(column,row);
            }
           }
            drawPathSquare(column, row, color);
        }
    }
    
}); 