import {log,a,msg} from "./helpers.js";
import {Render} from "./Render.js";

export class Calculadora{
    constructor(){
        this._dataAtual = new Date();
        this._horaAtual;
        this.horaAtual = this._dataAtual;
        this.dataAtual = this._dataAtual;
        this._displayValueNew  = "";
        this._displayValueOld  = "";
        this._displayValueResult = "";

        this._displayValues = [];
    }
    set dataAtual(textoQualquer){
        textoQualquer = new Date();
        this._dataAtual = textoQualquer.toLocaleDateString("pt-BR");
    }
    get dataAtual(){
        return this._dataAtual;
    }
    set horaAtual(textoQualquer){
        textoQualquer = new Date();
        this._horaAtual = textoQualquer.toLocaleTimeString();
    }
    get horaAtual(){
        return this._horaAtual;
    }
    set displayValueNew(valor){
        this._displayValueNew = valor;
    }
    get displayValueNew(){
        return this._displayValueNew;
    }
    set displayValueOld(valor){
        this._displayValueOld = valor;
    }
    get displayValueOld(){
        return this._displayValueOld;
    }
    checkInput(x){
        switch (x){
            case "/" :
            case "*" :
            case "+" :
            case "-" :
                return "operator";
            break;
            
            case "=" :
                return "equal";
            break;

            case "clear" :
                this.displayValueNew = "";
                this.displayValueOld = "";
                
                return "clear"
            break;

            case "." :
                return "dot";
            break;

            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
            //my code
                return "number";
            break;

            default:
                Render.displayError();
                return "error";
            break;
        }
    }
    pushToDisplayValues(value){
        this._displayValues.push(value);
    }
    clearDisplayValues(){
        this._displayValues = [];
    }
    get displayValues(){
        return this._displayValues;
    }
    set displayValueResult(x){
        this._displayValueResult = x;
    }
    
}