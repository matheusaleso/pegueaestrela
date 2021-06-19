class Board {// classe generica para os caminhos no tabuleiro
    constructor(row, column) {//construtor dos caminhos
        this.row = row;
        this.column = column;
        this.grid = this.initializeGrid();
        this.addObstacles();
        this.star = this.addStar();
        this.character = this.addCharacter();
        this.setNeighbors();
    }

    initializeGrid(){ // cria a matriz e inializa ela com nós vazios
        var board = [];// declara a "matriz", onde pra cada posicao no vetor eh criado outro vetor
        for(var i=0; i < this.row; i++){//percorre cada posicao do board
            board.push(new Array(this.column));
        }
        
        for(var i=0; i <this.row; i++){
            for(var j=0; j<this.column; j++){
                var node = new Node();
                node.setPosition(i,j);
                board[i][j] = node;
            }
        }
        
        return board;
    }

    getObstacles(){//cria um array de obstaculo
        var obstacles = [];
        for(var i=0; i<50; i++){// 50 => quantidade de obstaculos (determinado pelo grupo)
            var obstacle = new Node();
            obstacle.updatePosition(0, this.row-1, 0, this.column-1);
            obstacle.type = 1;
            obstacle.blocked = true;
            obstacles.push(obstacle);
        }
        return obstacles;
    }

    addObstacles(){//adiciona os obstaculos no tabuleiro
        var obstacles = this.getObstacles(this.row, this.column); //retorna um array com todos os obstaculos que vou colocar no grid
        var r;
        var c;

        for(var i=0; i<obstacles.length; i++){//percorre o array com os obstaculos
            r = obstacles[i].row;//pega a linha do obstaculo
            c = obstacles[i].column;//pega a linha do obstaculo
           if (this.grid[r][c].type != 0){//se a posicao nao esta vazia: da update pq tem algo la
                do{
                    obstacles[i].updatePosition(0, this.row-1,0, this.column-1);//atualiza a posicao do elemento
                    r = obstacles[i].row;//atualiza a linha do elemento
                    c = obstacles[i].column;//atualiza a coluna do elemento
                } while(this.grid[r][c].type != 0)
            } 
           this.grid[r][c] = obstacles[i];
        } 
    }

    addStar(){//adiciona a estrela no tabuleiro
        var star = new Node();//cria uma nova estrela 
        star.updatePosition(0, this.row-1, 0, this.column-1);
        star.type = 2;
        var starR = star.row;// pega a linha aleatrora da estrela
        var starC = star.column;// pega a coluna aleatrora da estrela
        
        while(this.grid[starR][starC].type != 0){
            star.updatePosition(0, this.row-1, 0, this.column-1);
            starR = star.row;
            starC = star.column;
        }
        this.grid[starR][starC] = star;//adiciona 2 no tabuleiro, estrela representada no tabuleiro => 2
        return star;
    }

    addCharacter(){//adiciona o personagem no tabuleiro
        var character = new Node();//cria uma nova personagem
        character.updatePosition(0, this.row-1, 0, this.column-1); 
        character.type = 3;
        character.blocked = true;
        var charR = character.row;// pega a linha aleatrora da personagem
        var charC = character.column;// pega a coluna aleatrora da personagem
        while(this.grid[charR][charC].type != 0){
            character.updatePosition(0, this.row-1, 0, this.column-1);
            charR = character.row;
            charC = character.column;
        }
        this.grid[charR][charC] = character;//adiciona 3 no tabuleiro, character representada no tabuleiro => 3
        return character;
    }

    setNeighbors(){
        //tratando posicao 00 do board
            if(this.grid[0][1].blocked == false){
                this.grid[0][0].addNeighbor(this.grid[0][1]);
            }
            if(this.grid[1][0].blocked == false){
                this.grid[0][0].addNeighbor(this.grid[1][0]);
            }
            if(this.grid[1][1].blocked == false){
                this.grid[0][0].addNeighbor(this.grid[1][1]);
            }
            
        //se estiver no canto inferior esquerdo
            if(this.grid[this.row-2][0].blocked == false){
                this.grid[this.row-1][0].addNeighbor(this.grid[this.row-2][0]);
            }
            if(this.grid[this.row-1][1].blocked == false){
                this.grid[this.row-1][0].addNeighbor(this.grid[this.row-1][1]);
            }
            if(this.grid[this.row-2][1].blocked == false){
                this.grid[this.row-1][0].addNeighbor(this.grid[this.row-2][1]);
            }
            
        //se estiver no canto superior direito
            if(this.grid[0][this.column-2].blocked == false){
                this.grid[0][this.column-1].addNeighbor(this.grid[0][this.column-2]);
            }
            if(this.grid[1][this.column-1].blocked == false){
                this.grid[0][this.column-1].addNeighbor(this.grid[1][this.column-1]);
            }
            if(this.grid[1][this.column-2].blocked == false){
                this.grid[0][this.column-1].addNeighbor(this.grid[1][this.column-2]);
            }
        //se estiver no canto inferior direito
            if(this.grid[this.row-2][this.column-1].blocked == false){
                this.grid[this.row-1][this.column-1].addNeighbor(this.grid[this.row-2][this.column-1]);
            }
            if(this.grid[this.row-1][this.column-2].blocked == false){
                this.grid[this.row-1][this.column-1].addNeighbor(this.grid[this.row-1][this.column-2]);
            }
            if(this.grid[this.row-2][this.column-2].blocked == false){
                this.grid[this.row-1][this.column-1].addNeighbor(this.grid[this.row-2][this.column-2]);
            }
          
            for(var r = 0; r < this.row; r++ ){
                for(var c = 0; c < this.column; c++){
                    if((r==0 && c==0) || (r==(this.row-1) && c==(this.column-1)) && (r==(this.row-1) && c==0) && (r==(this.row-1) && c==(this.column-1))){
                        continue;
                    }
    
                    if(r == 0 && c != 0 && c != (this.column-1)){ // Toda a primeira linha menos as extremidades
                        if(this.grid[r][c-1].blocked == false){
                            this.grid[r][c].addNeighbor(this.grid[r][c-1]);
                        } 
                        if(this.grid[r+1][c-1].blocked == false){
                            this.grid[r][c].addNeighbor(this.grid[r+1][c-1]);
                        } 
                        if(this.grid[r+1][c].blocked == false){
                            this.grid[r][c].addNeighbor(this.grid[r+1][c]);
                        }
                        if(this.grid[r][c+1].blocked == false){
                            this.grid[r][c].addNeighbor(this.grid[r][c+1]);
                        }
                        if(this.grid[r+1][c+1].blocked == false){
                            this.grid[r][c].addNeighbor(this.grid[r+1][c+1]);
                        }
                    }else{
                        if(r == (this.row-1) && c != 0 && c != (this.column-1)){ // Toda a última linha menos as extremidades
                            if(this.grid[r][c-1].blocked == false){
                                this.grid[r][c].addNeighbor(this.grid[r][c-1]);
                            } 
                            if(this.grid[r-1][c-1].blocked == false){
                                this.grid[r][c].addNeighbor(this.grid[r-1][c-1]);
                            }
                            if(this.grid[r-1][c].blocked == false){
                                this.grid[r][c].addNeighbor(this.grid[r-1][c]);
                            }
                            if(this.grid[r][c+1].blocked == false){
                                this.grid[r][c].addNeighbor(this.grid[r][c+1]);
                            }
                            if(this.grid[r-1][c+1].blocked == false){
                                this.grid[r][c].addNeighbor(this.grid[r-1][c+1]);
                            }
                        } else{
                            if(r != 0 && r != (this.row-1) && c == 0){ // Toda a primeira coluna menos as extremidades
                                if(this.grid[r+1][c].blocked == false){
                                    this.grid[r][c].addNeighbor(this.grid[r+1][c]);
                                }
                                if(this.grid[r+1][c+1].blocked == false){
                                    this.grid[r][c].addNeighbor(this.grid[r+1][c+1]);
                                }  
                                if(this.grid[r][c+1].blocked == false){
                                    this.grid[r][c].addNeighbor(this.grid[r][c+1]);
                                }
                                if(this.grid[r-1][c].blocked == false){
                                    this.grid[r][c].addNeighbor(this.grid[r-1][c]);
                                }
                                if(this.grid[r-1][c+1].blocked == false){
                                    this.grid[r][c].addNeighbor(this.grid[r-1][c+1]);
                                }
                            } else{
                                if(r != 0 && r != (this.row-1) && c == (this.column-1)){ // Toda a última coluna menos as extremidades
                                    if(this.grid[r+1][c].blocked == false){
                                        this.grid[r][c].addNeighbor(this.grid[r+1][c]);
                                    }
                                    if(this.grid[r+1][c-1].blocked == false){
                                        this.grid[r][c].addNeighbor(this.grid[r+1][c-1]);
                                    } 
                                    if(this.grid[r][c-1].blocked == false){
                                        this.grid[r][c].addNeighbor(this.grid[r][c-1]);
                                    }
                                    if(this.grid[r-1][c].blocked == false){
                                        this.grid[r][c].addNeighbor(this.grid[r-1][c]);
                                    }
                                    if(this.grid[r-1][c-1].blocked == false){
                                        this.grid[r][c].addNeighbor(this.grid[r-1][c-1]);
                                    }
                                } 
                                else{
                                    if((r>0 && c>0 && r<(this.row-1) && c<(this.column-1))){ //quadrados centrais, ou seja, com 8 vizinhos
                                        if(this.grid[r+1][c].blocked == false){
                                            this.grid[r][c].addNeighbor(this.grid[r+1][c]);
                                        }
                                        if(this.grid[r+1][c+1].blocked == false){
                                            this.grid[r][c].addNeighbor(this.grid[r+1][c+1]);
                                        }
                                        if(this.grid[r+1][c-1].blocked == false){
                                            this.grid[r][c].addNeighbor(this.grid[r+1][c-1]);
                                        }
                                        if(this.grid[r-1][c].blocked == false){
                                            this.grid[r][c].addNeighbor(this.grid[r-1][c]);
                                        }
                                        if(this.grid[r-1][c+1].blocked == false){
                                            this.grid[r][c].addNeighbor(this.grid[r-1][c+1]);
                                        }
                                        if(this.grid[r-1][c-1].blocked == false){
                                            this.grid[r][c].addNeighbor(this.grid[r-1][c-1]);
                                        }
                                        if(this.grid[r][c+1].blocked == false){
                                            this.grid[r][c].addNeighbor(this.grid[r][c+1]);
                                        }
                                        if(this.grid[r][c-1].blocked == false){
                                            this.grid[r][c].addNeighbor(this.grid[r][c-1]);
                                        }    
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    
}