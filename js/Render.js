import {log,a,msg} from "./helpers.js";

export class Render{
    constructor(){
        throw new Error("nao pode instanciar classe Render");
    }

    static atualizarTela(){

        displayDate.innerHTML = calculator.dataAtual;
        calculator.horaAtual = "atualizar";
        displayTime.innerHTML = calculator.horaAtual;

    }
    static updateIntoDisplay(){
        displayCalculator.innerHTML = calculator.displayValues[calculator.displayValues.length];
    }
    static displayError(){
        displayCalculator.innerHTML = "Error";
    }
    static clearCalculator(){
        displayCalculator.innerHTML = "0";
    }static displayCount(){
        displayCalculator.innerHTML = calculator.displayValues.join("");
    }
}