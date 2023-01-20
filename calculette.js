let keys = document.querySelectorAll(".key"); //on vise toutes les touches de la calculette

//pour chacune des touches de la calculette, on leur met un attribut readonly en "readonly"
//afin de ne pas pouvoir modifier la valeur des <input>
for (let i =0; i < keys.length; i++){
    keys[i].setAttribute("readonly", "readonly");
}



let result_screen = document.querySelector("#result_screen"); // on vise sur l'écran d'affichage de la calculette

/* création d'un tableau
* indice 0 correspond a ce qui est afficher sur l'écran de la calculette
* indice 1 correspond lorsqu'on fait une opération pour stocker le chiffre auquel on veut faire une opération
* indice 2 correspond au type d'opération
* On ne stock que des String dans ce tableau.
*/
let calculatorTab = ["0","0","0"];
let calculEnCours = false;


function calculate(key){
    //si on appuie sur un chiffre
    if(key != "+" && key != "-" && key != "/" && key != "X" && key != "=" && key != "CE" && key != "%" && key != "\u2190" && key != "," && key != "\u00b1"){

        /*ici on verifie que soit : sur l'écran il y a afficher "0" ou alors qu'une touche opération a été appuyé.
        Dans ce cas , on remplace ce qu'il y a afficher sur l'écran par la touche
        */
        if(calculatorTab[0] == "0" || calculEnCours == true ){ 
            calculatorTab[0] = key;
            calculEnCours = false;
        }else{ /*Sinon on concatène ce qu'il y a d'afficher avec la valeur de la nouvelle touche*/
            calculatorTab[0] += key;
        }
        /*Si la touche appuyée est une touche opération  */ 
    }else if(key == "+" || key == "-" || key == "X" || key == "/" || key == "%"){
        if(calculatorTab[2] == "0"){ //si aucune opération n'avait encore été appuyée
            calculatorTab[2] = key //alors on enregistre le type d'opération
            calculatorTab[1] = calculatorTab[0]; //et on enregistre la premier nombre sur lequel on veut opérer dans l'indicie 1 du tableau
            calculEnCours = true; // et on met a true le booleen qui dit qu'on a demander une opération
        }else{ /* sinon si une opération avait DEJA été demandée */
            switch(key){
                case "+":
                    egal(); // alors on fait deja le calcul de la premiere opération
                    calculatorTab[2] = "+"; //puis on stock le type d'opération que l'on souhaite faire ensuite
                    calculatorTab[1] = calculatorTab[0];
                    calculEnCours = true;
                    break;
                case "-":
                    egal();
                    calculatorTab[2] = "-";
                    calculatorTab[1] = calculatorTab[0];
                    calculEnCours = true;
                    break;
                case "X" : 
                    egal();
                    calculatorTab[2] = "X";
                    calculatorTab[1] = calculatorTab[0];
                    calculEnCours = true;
                    break;
                case "/" :
                    egal()
                    calculatorTab[2] = "/";
                    calculatorTab[1] = calculatorTab[0];
                    calculEnCours = true;
                    break;
                case "%":
                    egal();
                    calculatorTab[2] = "%";
                    calculatorTab[1] = calculatorTab[0];
                    calculEnCours = true;
                    break;
                
            }
        }
    }else{
        switch(key){
            case "CE": //CE réinitialise tout
                calculatorTab = ["0", "0", "0"];
                break;
            case "\u2190": //permet de supprimer le dernier charactere du string
                calculatorTab[0] = calculatorTab[0].substring(0,calculatorTab[0].length-1);
                break;
            case "=": //réinitialise l'opération et le nombre en "mémoire".
                egal();
                calculatorTab = [calculatorTab[0], "0", "0"];
                calculEnCours = true;
                break;
            case ",": // si il y n'y a pas deja une virgule/point alors on ajoute une virgule/point
                if(!calculatorTab[0].includes(".")){
                    calculatorTab[0] += ".";
                }
                break;
            case "\u00b1": //permet de passer le nombre afficher en son opposé.
                calculatorTab[0] = Number(calculatorTab[0]);
                calculatorTab[0] = -calculatorTab[0];
                calculatorTab[0].toString();
                break;
        }
    }

    result_screen.value = calculatorTab[0];
}


/*Fonction calcul qui est appelée lorsqu'on appuie sur égal ou qu'il y a plusieurs opérations de faites. */
function egal(){
    if(calculatorTab[2] == "+"){
        calculatorTab[0] = (Number(calculatorTab[1]) + Number(calculatorTab[0])).toString();
    }else if(calculatorTab[2] == "-"){
        calculatorTab[0] = (Number(calculatorTab[1]) - Number(calculatorTab[0])).toString();
    }else if(calculatorTab[2] == "X"){
        calculatorTab[0] = (Number(calculatorTab[1]) * Number(calculatorTab[0])).toString();
    }else if(calculatorTab[2] == "/"){
        calculatorTab[0] = (Number(calculatorTab[1]) / Number(calculatorTab[0])).toString();
    }else if(calculatorTab[2] == "%"){
        calculatorTab[0] = (Number(calculatorTab[1]) % Number(calculatorTab[0])).toString();
    }
}



//on stock chacun des inputs color
bg_color_input = document.querySelector("#bg_color_input");
calc_bg_color_input = document.querySelector("#calc_bg_color_input");
key_bg_color_input = document.querySelector("#key_bg_color_input");

//mise à jour en temps reel de la couleur en fonction du choix sur l'input
bg_color_input.addEventListener("input", function(){
    document.body.style.backgroundColor = this.value;
})

//mise à jour en temps reel de la couleur en fonction du choix sur l'input
calc_bg_color_input.addEventListener("input", function(){
    document.querySelector("#calculator").style.backgroundColor = this.value;
})

//mise à jour en temps reel de la couleur en fonction du choix sur l'input
key_bg_color_input.addEventListener("input", function(){
    keys = document.querySelectorAll(".key");
    for(let i = 0; i < keys.length; i++){
        keys[i].style.background = "linear-gradient(#fff," +this.value+ ")";
    }
})


bg_image_input = document.querySelector("#bg_image_input");
let image = "";
bg_image_input.addEventListener("change",function(){

	let reader = new FileReader();
    reader.readAsDataURL(bg_image_input.files[0]);
    console.log("done");        
})


//detection touches du clavier
document.addEventListener("keydown",function(e){
    console.log(e);
    switch(e.key){
        case "0":
            calculate("0");
            break;
        case "1":
            calculate("1");
            break;
        case "2":
            calculate("2");
            break;
        case "3":
            calculate("3");
            break;
        case "4":
            calculate("4");
            break;
        case "5":
            calculate("5");
            break;
        case "6":
            calculate("6");
            break;
        case "7":
            calculate("7");
            break;
        case "8":
            calculate("8");
            break;
        case "9":
            calculate("9");
            break;
        case "+":
            calculate("+");
            break;
        case "-":
            calculate("-");
            break;
        case "*":
            calculate("X");
            break;
        case "/":
            calculate("/");
            break;
        case "Enter":
            calculate("=");
            break;
        case ",":
            calculate(",");
            break;
        case ".":
            calculate(",");
            break;
        case "%":
            calculate("%");
            break;
        case "Backspace":
            calculate("\u2190");
            break;
        case "Delete":
            calculate("CE");
            break;
        case "Escape":
            calculate("CE");
            break;
    }
})

