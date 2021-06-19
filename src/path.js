class Path {// classe generica para os caminhos no tabuleiro
    constructor(beginNode, endNode) {//construtor dos caminhos
        this.begin = beginNode;//no inicial
        this.end = endNode;//no final
    }

    calculateHeuristic(current, goal, admissible) { 
        if(admissible == true){
            var dx = Math.abs(current.row-goal.row);
            var dy = Math.abs(current.column-goal.column);
            return 100 * (dx + dy) + (141 - 2 * 100) * Math.min(dx, dy); //141 valor resultante de pitagoras, valor na diagonal; 100 é o valor na horizontal e vertical
        } else{
            var dx = Math.abs(current.row-goal.row);
            var dy = Math.abs(current.column-goal.column);
            return ((dx+dy)*100)*Math.floor(Math.random() * (1000 - 10 + 1) ) + 10;   // sortear um numero entre 1000 e 10 para a heuristica dar errado
        }
    }  

    openSort(a,b){// criterio de desempate; pega o primeiro no aberto que entrou 
        if(a.fCost > b.fCost){
            return 1;
        } 
        if(a.fCost < b.fCost){
            return -1;
        } else{
            if(a.index > b.index){
                return 1;
            }
            if(a.index < b.index){
                return -1;
            } else{
                return 0;
            }
        }
    }

    getPath(admissible, current){
        this.printCost(admissible, current.gCost);
        var ret = [];
        while(current.parent){
            ret.push(current);
            current = current.parent;
        }
        ret.push(current);
        
        return ret.reverse();//ir de tras pra frente em relacao ao vetor
    }
    
    aStar(admissible){     
        var open = []; //lista de abertos
        var closed = []; //lista de fechados

        this.begin.gCost = 0;
        this.begin.hCost = this.calculateHeuristic(this.begin,this.end, admissible);
        this.begin.index = open.length;
        open.push(this.begin);
               
        while(open.length != 0){
            this.printList(open, admissible,"open");
            this.printList(closed,admissible,"closed");

            open.sort(this.openSort);
            var current = open[0];
                        
            if(current.row == this.end.row && current.column == this.end.column){
                var path = this.getPath(admissible, current);
                return path;// sai do while
            }

            open.shift();// tirar o menor da lista de abertos
            closed.push(current); //adicionar a lista de fechados (ja visitado)
            
            for(var i = 0; i < current.neighbors.length; i++){
                let neighbor = current.neighbors[i];
                
                var movementCost = 100;
                if (neighbor.row != current.row && neighbor.column != current.column){
                    movementCost = 141;
                }

                if(closed.indexOf(neighbor) != -1){ // ignora se o vizinho estiver na lista fechada
                    continue;
                }

                if(open.find(value => value.row == neighbor.row && value.column == neighbor.column) == undefined){//vizinhos nao esta na lista de abertos
                    neighbor.parent = current;//pai do no vizinho eh o no atual
                    neighbor.gCost = current.gCost + movementCost; //seta o valor de g
                    neighbor.hCost = this.calculateHeuristic(neighbor,this.end, admissible);//seta o valor da heuritica
                    neighbor.fCost = neighbor.gCost + neighbor.hCost;   //calcula o valor de f
                    var position = open.length;
                    neighbor.index = ++position;
                    open.push(neighbor);//adiciona o no a lista de abertos
                } else{//considera nos repetidos
                    var anotherCost = current.gCost + movementCost;
                    if(anotherCost < neighbor.gCost){
                        neighbor.parent = current;
                        neighbor.gCost = anotherCost;
                        neighbor.fCost = neighbor.gCost + neighbor.hCost;
                    }
                }
            }
            this.printTree(current, admissible, open);
        }

        return 0;
    }
    printCost(admissible, cost){
        var element;
        if(admissible == true){
            element = document.getElementById("title-heuristicAdmissible");
        } else {
            element = document.getElementById("title-heuristicNonAdmissible");
        }
        element.innerHTML = "Custo Real: " + cost;
    }

    printList(list,admissible,type){
        var table;
        var div;
        if(admissible == true){
            div = document.getElementById("heuristicAdmissible");
            if(type == "open"){
                table = document.getElementById("tableAOpen");
            } else{
                table = document.getElementById("tableAClosed");
            }
        } else{
            div = document.getElementById("heuristicNonAdmissible");
            if(type == "open"){
                table = document.getElementById("tableNOpen");
            } else{
                table = document.getElementById("tableNClosed");
            }
        }
        
        var text = "";
        for(let element of list){
            text += "[" + element.row + "," + element.column + "]";
        }
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var node = document.createTextNode(text);
        td.appendChild(node);
        tr.appendChild(td);
        table.appendChild(tr);
        div.appendChild(table);
    }

    printTree(current, admissible, open){
        open.sort(this.openSort);
        var div;
        var table;
        if(admissible == true){
            div = document.getElementById("heuristicAdmissibleTree");
            table = document.getElementById("heuristicAdmissibleTreeTable");
        } else {
            div = document.getElementById("heuristicNonAdmissibleTree");
            table = document.getElementById("heuristicNonAdmissibleTreeTable");
        }
        
        var trCurrent = document.createElement("tr"); // linha do atual
        var tdCurrent = document.createElement("td") // coluna do atual 
        tdCurrent.style.borderRadius = '100%'; // arredonda a borda
       
        var text = "["+ current.row + "," + current.column + "]";
        var currentText = document.createTextNode(text);
        tdCurrent.appendChild(currentText); // adiciona o texto na coluna
        trCurrent.appendChild(tdCurrent); // adiciona a coluna na linha
        table.appendChild(trCurrent); // adiciona a linha na table
        
        let nodeRow = document.createElement('tr'); // linha que armazena as posições dos nós
        let fcostRow = document.createElement('tr'); // linha que armazena os fcost dos nos
        let blankRow = document.createElement('tr'); // linha vazia

        open.forEach(function (item) {
            var positionNode = "["+ item.row + "," + item.column + "]"; // texto com a posição
            var cost = "f(x) = " + Math.round(item.fCost *100)/100; // texto com o fcost

            let nodeCol = document.createElement('td'); 
            let fcostCol = document.createElement('td');
            let blankCol = document.createElement('td');

            nodeCol.style.borderRadius = '100%'
            fcostCol.style.border = 'none';
            blankCol.style.border = 'none';

            nodeCol.innerHTML += positionNode;
            fcostCol.innerHTML += cost;
            blankCol.innerHTML += " ";

            nodeRow.appendChild(nodeCol);
            fcostRow.appendChild(fcostCol);
            blankRow.appendChild(blankCol);
        });

        table.appendChild(nodeRow);
        table.appendChild(fcostRow);
        table.appendChild(blankRow);
        div.appendChild(table);
    } 
}