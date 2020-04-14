import {log,a,msg} from "./helpers.js";
import {Calculadora} from "./Calculadora.js";
import {Render} from "./Render.js";

window.obj;
window.svgExtraido ="";
window.displayCalculator ="";
window.displayDate = "";
window.displayTime = "";

window.btn1;
window.btn2;
window.btn3;
window.btn4;
window.btn5;
window.btn6;
window.btn7;
window.btn8;
window.btn9;
window.btn0;

window.btnPlus;
window.btnMinus;
window.btnDivide;
window.btnMultiply;
window.btn1Equal;
window.btn1Dot;
window.btn1Clear;

window.onload = ()=>{

window.calculator = new Calculadora();

mapearSvg();
atualizarTelaPeriodicamente();

}

function mapearSvg(){
    window.obj = svgObject;

    svgExtraido = obj.contentDocument;

    displayDate = svgExtraido.getElementById("displayData");
    displayTime = svgExtraido.getElementById("displayHora");
    displayCalculator = svgExtraido.getElementById("displayCalculo");

    mapearBtns();
    

}
function atualizarTelaPeriodicamente(){
    setInterval(function(){
        Render.atualizarTela();
    },500);
}
function mapearBtns(){
    window.btn1 = svgExtraido.getElementById("button1");
    window.btn2 = svgExtraido.getElementById("button2");
    window.btn3 = svgExtraido.getElementById("button3");
    window.btn4 = svgExtraido.getElementById("button4");
    window.btn5 = svgExtraido.getElementById("button5");
    window.btn6 = svgExtraido.getElementById("button6");
    window.btn7 = svgExtraido.getElementById("button7");
    window.btn8 = svgExtraido.getElementById("button8");
    window.btn9 = svgExtraido.getElementById("button9");
    window.btn0 = svgExtraido.getElementById("button0");

    window.btnPlus = svgExtraido.getElementById("buttonMais");
    window.btnMinus = svgExtraido.getElementById("buttonMenos");
    window.btnDivide = svgExtraido.getElementById("buttonDivide");
    window.btnMultiply = svgExtraido.getElementById("buttonMultiplica");
    window.btnEqual = svgExtraido.getElementById("buttonIgual");
    window.btnDot = svgExtraido.getElementById("buttonDot");
    window.btnClear = svgExtraido.getElementById("buttonClear");

    window.btns = [];
    window.btns.push(
        window.btn1,
        window.btn2,
        window.btn3,
        window.btn4,
        window.btn5,
        window.btn6,
        window.btn7,
        window.btn8,
        window.btn9,
        window.btn0,
        window.btnPlus,
        window.btnMinus, 
        window.btnDivide,
        window.btnMultiply,
        window.btnEqual,
        window.btnDot,
        window.btnClear
    );
    setBtnsListeners();
}
function setListener(btnBase,valor="empty"){

    btnBase.addEventListener("click", ()=>{

        let input;
        let velho;
        let novo ;

        if (calculator.displayValues == 'NaN'){
            calculator.clearDisplayValues();
            Render.clearCalculator();
        } 

        //msg("--->"+calculator.displayValues)
        if(calculator.checkInput(valor.nodeValue) != "equal"){

            calculator.displayValueOld = calculator.displayValueNew;
            calculator.displayValueNew = valor.nodeValue;

            input = valor.nodeValue;
            velho = calculator.displayValueOld;
            novo = calculator.displayValueNew;
        }else{
            input = valor.nodeValue;
        }


        if(calculator.checkInput(input)=="operator"){
            //log(calculator.checkInput(velho))
            //eval(velho)

            let first = calculator.displayValues[0]
            let second = calculator.displayValues[1]

            if(first == "-" && (calculator.checkInput(second)=="number" || calculator.checkInput(second)=="error")){
                let temp = calculator.displayValues.join("");
                calculator.clearDisplayValues();
                calculator.pushToDisplayValues(temp);
            }
            
            if((calculator.checkInput(velho)=="number" || calculator.checkInput(velho)=="error") && eval(velho) == 0){
                //log('aqui0')
                if(second == "-"){
                    let temp = (eval(calculator.displayValues.join("")))
                    calculator.clearDisplayValues();
                    calculator.pushToDisplayValues(temp);
                    calculator.pushToDisplayValues(input);
                    Render.clearCalculator();
                }else{
                    let temp = calculator.displayValues[(calculator.displayValues).length-1]
                    calculator.clearDisplayValues();
                    calculator.pushToDisplayValues(temp);
                    calculator.pushToDisplayValues(input);
                    Render.clearCalculator();
                }
                
            }else if(calculator.checkInput(velho)=="number" || calculator.checkInput(velho)=="error"){
                if(calculator.displayValues.length<1){
                    //log("aqui1")
                    if(valor.nodeValue =="-"){
                        calculator.clearDisplayValues();
                        calculator.pushToDisplayValues("-");
                    }
                }else if((calculator.displayValues).length=3){
                    //log('aqui2')
                    //log(calculator.displayValues)
                    novo = (eval(calculator.displayValues.join("")))
                    calculator.clearDisplayValues();

                    calculator.pushToDisplayValues(novo);
                    calculator.pushToDisplayValues(input);
                }else{
                    //log('aqui3')
                    calculator.displayValueOld = calculator.displayValues[(calculator.displayValues).length-1]+novo;
                    calculator.displayValues[(calculator.displayValues).length-1] = calculator.displayValueOld
                }
                
            }
            Render.displayCount();
        }else if(calculator.checkInput(input)=="number"){
            if(calculator.displayValues[0] =="0" && calculator.displayValues.length>0){
                calculator.clearDisplayValues();
            }

            if(calculator.displayValues<1){
                //log("a")
                calculator.pushToDisplayValues(novo);
            }
            else if(calculator.checkInput(velho)=="number" || calculator.checkInput(velho)=="error" || calculator.checkInput(velho)=="dot"){
                //log("b")
                
                calculator.displayValueOld = calculator.displayValues[(calculator.displayValues).length-1]+novo;
                let temporario = calculator.displayValueOld
                temporario = (temporario.toString().indexOf('.'))
                if(temporario == -1){
                    calculator.displayValues[(calculator.displayValues).length-1] = parseInt(calculator.displayValueOld)
                    
                }else if(temporario != -1){
                    let temp = parseFloat(calculator.displayValueOld);
                    let temporario = calculator.displayValueOld;
                    let precision = temporario.split(".")[1].length;
                    temp = parseFloat(calculator.displayValueOld).toFixed(precision);
                    if(valor.nodeValue == '0'){
                        calculator.displayValues[(calculator.displayValues).length-1] = temp
                    }else{
                        calculator.displayValues[(calculator.displayValues).length-1] = parseFloat(calculator.displayValueOld)
                    }
                    
                }
                
                
            }else if(calculator.checkInput(velho)=="operator"){
                //log("c")
                calculator.pushToDisplayValues(novo);
            }
            Render.displayCount();
        }else if(calculator.checkInput(input)=="clear"){
            calculator.clearDisplayValues();
            Render.clearCalculator();

        }else if(calculator.checkInput(input)=="dot"){
            let temp = calculator.displayValues[calculator.displayValues.length-1]
            temp = (temp.toString().indexOf('.'))
            if(temp == -1){
                if(calculator.checkInput(velho)=="number" || calculator.checkInput(velho)=="error"){
                    calculator.displayValueOld = calculator.displayValues[(calculator.displayValues).length-1]+novo;
                    calculator.displayValues[(calculator.displayValues).length-1] = calculator.displayValueOld
                    Render.displayCount();
                }
            }
            
        }else if(calculator.checkInput(input)=="equal"){

            try{
                if(calculator.displayValues.length == 2){

                }else if((calculator.displayValues).length<=3){
                    novo = (eval(calculator.displayValues.join("")))
                    calculator.clearDisplayValues();
    
                    calculator.pushToDisplayValues(novo);
    
                    Render.displayCount();
                }
            }catch(e){
                calculator.clearDisplayValues();
                Render.clearCalculator();
            }
            
        }

        if (calculator.displayValues == 'NaN'){
            Render.displayError();
        }
        //log("---value old: " + calculator.displayValueOld)
        //log("---value new: "+calculator.displayValueNew)
        log("---values[]: "+calculator.displayValues)
        log(calculator.displayValues)
    });
}
function setBtnsListeners(){
    window.btns.forEach(element => {

        setListener(element,element.attributes.value);

    });
}
