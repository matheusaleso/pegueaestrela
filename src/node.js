class Node {// classe generica para todas as nos no tabuleiro
    constructor() {//construtor dos nos
        this.row = 0;//ja recebe um valor aleatorio pra linha
        this.column = 0;//ja recebe um valor aleatorio pra coluna
        this.blocked = false;
        this.gCost = 0;
        this.hCost = 0;
        this.fCost = 0;
        this.parent = null;//pais do no
        this.neighbors = [];//vizinhos do no
        this.type = 0;// indica qual elemento esta no tabuleiro
        this.index = 0;//indica a posicao do no na lista de abertos
    }

    setPosition(row, col){
        this.row = row;
        this.column = col;
    }

    addNeighbor(newNode) { 
        if(this.neighbors.indexOf(newNode) == -1){
            this.neighbors.push(newNode);
        }
    }

    getRndInteger(min, max) { //posicao aleatoria do tabuleiro
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    updatePosition(minR, maxR, minC, maxC) {//da update na posicacao do personagem
        this.row = this.getRndInteger(minR, maxR);
        this.column = this.getRndInteger(minC, maxC);
    }

}