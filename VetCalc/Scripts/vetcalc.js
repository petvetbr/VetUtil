/// <reference path="util.ts" />
/// <reference path="animal.ts" />
/// <reference path="jqueryui-1.9.d.ts" />
/// <reference path="knockout-2.2.d.ts" />
/// <reference path="jquery-1.8.d.ts" />
var zero = '0';
var KeyValue = (function () {
    function KeyValue(key, value) {
        this.key = key;
        this.value = value;
    }
    return KeyValue;
})();
var species;
var especies = [
    new KeyValue('canina', 'Canina'), 
    new KeyValue('felina', 'Felina'), 
    new KeyValue('bovina', 'Bovina'), 
    new KeyValue('caprina', 'Caprina'), 
    new KeyValue('equina', 'Equina'), 
    new KeyValue('ovina', 'Ovina'), 
    new KeyValue('suina', 'Suina')
];
var maxAnimalWeight;
var minAnimalWeight;
var DehitrationPercent;
var kg = 0;
var g = 0;
$(document).ready(function () {
    var ux = new Ux();
    $('#lbEmail').mouseover(function () {
        ux.showEmail();
    });
    $('#lbMsn').mouseover(function () {
        ux.showMSN();
    });
    $("#dados").draggable();
    $("#vitais").draggable();
    $("#drogas").draggable();
    $("#hidratacao").draggable();
    $("#sobre").draggable();
    $("#instrucoes").draggable();
    $("#ads").draggable();
    $("#gestacao").draggable();
    ko.applyBindings(vcm);
    $("#txKg").keyup(function () {
        ux.txWeightChange();
    });
    $("#txKg").change(function () {
        ux.txWeightChange();
    });
    $("#txGrams").keyup(function () {
        ux.txWeightChange();
    });
    $("#txGrams").change(function () {
        ux.txWeightChange();
    });
    $("#txKg").click(function () {
        ux.txWeightChange();
    });
    $("#txGrams").click(function () {
        ux.txWeightChange();
    });
    //$("#txKg").mousewheel(()=> {
    //    txWeightChange();
    //});
    //$("#txGrams").mousewheel(()=> {
    //    txWeightChange();
    //});
    $("#slSpecies").click(function () {
        ux.SpeciesChange();
    });
    $("#txDosagem").keyup(function () {
        ux.recalcDosage();
    });
    $("#txDosagem").change(function () {
        ux.recalcDosage();
    });
    $("#txDosagem").click(function () {
        ux.recalcDosage();
    });
    //$("#txDosagem").mousewheel(()=> {
    //    recalcDosage();
    //});
    $("#slUnidadeDroga").change(function () {
        ux.dosageUnitChange();
    });
    $("#txApresentacao").keyup(function () {
        ux.recalcDosage();
    });
    $("#txApresentacao").change(function () {
        ux.recalcDosage();
    });
    $("#txApresentacao").click(function () {
        ux.recalcDosage();
    });
    //$("#txApresentacao").mousewheel(()=> {
    //    recalcDosage();
    //});
    $("#slApresentacao").change(function () {
        ux.dosagePresentationChange();
    });
    $("#txHidratacao").keyup(function () {
        ux.Change();
    });
    $("#txHidratacao").change(function () {
        ux.Change();
    });
    $("#txHidratacao").click(function () {
        ux.Change();
    });
    var dataPadrao = new Date();
    ux.bindGestation("#txGestDia", dataPadrao.getDate());
    ux.bindGestation("#txGestMes", dataPadrao.getMonth() + 1);
    ux.bindGestation("#txGestAno", dataPadrao.getFullYear());
    ux.SpeciesChange();
    ux.dosageUnitChange();
});
var Ux = (function () {
    function Ux() { }
    Ux.prototype.bindGestation = function (controlId, valorPadrao) {
        var control = $(controlId);
        control.change(function () {
            Calc.calcGestation();
        });
        if(valorPadrao) {
            control.val(valorPadrao);
        }
    };
    Ux.prototype.showEmail = function () {
        $("#lbEmail").text("e-mail/gtalk: petvetbr@gmail.com");
    };
    Ux.prototype.showMSN = function () {
        $("#lbMsn").text("msn: fe@pobox.com");
    };
    Ux.prototype.ResetValues = function () {
        maxAnimalWeight = 0;
        if(vcm.Animal()) {
            vcm.Animal().Init();
        }
        $("#txKg").val(zero);
        $("#txGrams").val(zero);
        $("#txDosagem").val(zero);
        $("#txApresentacao").val(zero);
        $("#txHidratacao").val(zero);
        this.txWeightChange();
    };
    Ux.prototype.Change = function () {
        var weight = (kg + (g / 1000));
        if(!vcm.Animal()) {
            vcm.Animal() = ko.observable(new Animal());
        }
        vcm.Animal().weightKg = ko.observable(weight);
        vcm.Animal().calcVitals();
        this.HidratationChange();
        this.recalcDosage();
        Calc.calcGestation();
        ko.applyBindings(vcm);
    };
    Ux.prototype.SpeciesChange = function () {
        this.ResetValues();
        species = $("#slSpecies").val();
        if(!vcm.Animal()) {
            vcm.Animal() = ko.observable(new Animal());
        }
        vcm.Animal().species = species;
        vcm.Animal().calcVitals();
        maxAnimalWeight = vcm.Animal().maxweight();
        minAnimalWeight = vcm.Animal().minweight();
        this.Change();
    };
    Ux.prototype.dosageUnitChange = function () {
        var dosageDisplay = $("#slUnidadeDroga :selected").text().split("/")[0];
        $("#lbUnidadeDose").text(dosageDisplay);
        this.recalcDosage();
    };
    Ux.prototype.dosagePresentationChange = function () {
        this.recalcDosage();
    };
    Ux.prototype.recalcDosage = function () {
        var dosage = parseFloat($("#txDosagem").val());
        var unit = $("#slUnidadeDroga").val();
        var presentationDosage = parseFloat($("#txApresentacao").val());
        var resultado = Calc.calcDosage(dosage, unit, presentationDosage);
        $("#lbPresentationDosage").text(resultado.doseApresentacao.toFixed(2));
        $("#lbResultadoDose").text(resultado.dose.toFixed(2));
    };
    Ux.prototype.HidratationChange = function () {
        DehitrationPercent = $("#txHidratacao").val();
        if(vcm.Animal()) {
            vcm.Animal().setDehidrationPercent(DehitrationPercent);
            vcm.Animal().calcDehitration();
        }
    };
    Ux.prototype.txWeightChange = function () {
        var kgInput = $("#txKg").val();
        var gInput = $("#txGrams").val();
        var gValid = Utility.IsNumeric(gInput, 0, 999);
        var kgValid = Utility.IsNumeric(kgInput, 0, maxAnimalWeight);
        if(kgValid) {
            $("#txKg").css("background-color: #FFFFFF");
            kg = parseInt(kgInput);
        } else {
            $("#txKg").css("background-color: #FF6699");
        }
        if(gValid) {
            $("#txGrams").css("background-color: #FFFFFF");
            g = parseInt(gInput);
        } else {
            $("#txGrams").css("background-color: #FF6699");
        }
        var display = "Peso total: " + kg + " kg " + g + "g";
        var weight = kg + (g / 1000);
        $("#lbKg").text(display);
        this.Change();
    };
    return Ux;
})();
var Calc = (function () {
    function Calc() { }
    Calc.calcGestation = function calcGestation() {
        var dataCruzamento = this.ObterDataCruzamento();
        if(dataCruzamento) {
            var dtaPartoMin = this.ObterDataCruzamento();
            dtaPartoMin.setDate(dataCruzamento.getDate() + vcm.Animal().gestationPeriodMin());
            var dtaPartoMax = this.ObterDataCruzamento();
            dtaPartoMax.setDate(dataCruzamento.getDate() + vcm.Animal().gestationPeriodMax());
            if(dtaPartoMin && dtaPartoMax) {
                var util = new Util();
                $("#lbDataPartoMin").text(util.FormatDate(dtaPartoMin));
                $("#lbDataPartoMax").text(util.FormatDate(dtaPartoMax));
            }
        } else {
            var strDataInvalida = 'Data de cruzamento inválida';
            $("#lbDataPartoMin").text(strDataInvalida);
            $("#lbDataPartoMax").text(strDataInvalida);
        }
    };
    Calc.ObterDataCruzamento = function ObterDataCruzamento() {
        var dia = parseInt($("#txGestDia").val(), 10);
        var mes = parseInt($("#txGestMes").val(), 10);
        var ano = parseInt($("#txGestAno").val(), 10);
        if(mes > 0 && mes <= 12) {
            //fevereiro
            if(mes === 2) {
                if(ano % 4 === 0 && ano % 400 != 0) {
                    if(dia < 0 || dia > 29) {
                        return null;
                    }
                } else {
                    if(dia < 0 || dia > 28) {
                        return null;
                    }
                }
            } else //meses com 31 dias
            if(mes === 1 || mes === 3 || mes === 5 || mes === 7 || mes === 8 || mes === 10 || mes === 12) {
                if(dia < 0 || dia > 31) {
                    return null;
                }
            } else//meses com 30
             {
                if(dia < 0 || dia > 30) {
                    return null;
                }
            }
            return new Date(ano, (mes - 1), dia);
        }
        return null;
    };
    Calc.calcDosage = function calcDosage(dosage, unit, presentationDosage) {
        var retorno = new dosagem();
        var dose = 0;
        var dosemg = 0;
        var doseApresentacao = 0;
        var isDoseML = false;
        if(isNaN(dosage)) {
            dose = null;
        } else {
            switch(unit.substring(2)) {
                case ("M2"): {
 {
                        dose = (vcm.Animal().areaM2 * dosage);
                        var presentationDosage = parseFloat($("#txApresentacao").val());
                    }
                    break;
                }
                case ("10"): {
 {
                        dose = (vcm.Animal().weightKg() * dosage) / 10;
                        dose = dose;
                        doseApresentacao = dose;
                        isDoseML = true;
                    }
                    break;
                }
                case ("100"): {
 {
                        dose = ((vcm.Animal().weightKg() * dosage) / 100);
                        doseApresentacao = dose;
                        isDoseML = true;
                    }
                    break;
                }
                default: {
 {
                        dose = (vcm.Animal().weightKg() * dosage);
                    }
                    break;
                }
            }
            var unitscale = unit.substring(0, 2);
            if(unitscale == "g") {
                dosemg = dose * 1000;
            } else {
                if(unitscale == "ug") {
                    dosemg = dose / 1000;
                } else {
                    dosemg = dose;
                }
            }
            if(isNaN(presentationDosage)) {
                if(!isDoseML) {
                    doseApresentacao = 0;
                }
            } else {
                var unit = $("#slApresentacao").val();
                switch(unit) {
                    case ("mg"): {
 {
                            doseApresentacao = dosemg / presentationDosage;
                        }
                        break;
                    }
                    case ("percent"): {
 {
                            doseApresentacao = dosemg / (presentationDosage * 10);
                        }
                        break;
                    }
                    case ("mg5"): {
 {
                            doseApresentacao = dosemg / (presentationDosage / 5);
                        }
                        break;
                    }
                    case ("ug"): {
 {
                            doseApresentacao = (dosemg / presentationDosage) * 1000;
                        }
                        break;
                    }
                }
                //doseApresentacao = doseApresentacao;
                            }
        }
        retorno.dose = dose;
        retorno.doseApresentacao = doseApresentacao;
        return retorno;
    };
    return Calc;
})();
var Utility = (function () {
    function Utility() { }
    Utility.isNumber = function isNumber(value) {
        return isFinite(value);
    };
    Utility.IsNumeric = function IsNumeric(input, min, max) {
        var retvalue = false;
        if(Utility.isNumber(input)) {
            if(input >= min && input <= max) {
                return true;
            }
        }
        return retvalue;
    };
    return Utility;
})();
var dosagem = (function () {
    function dosagem() { }
    return dosagem;
})();
var VetCalcViewModel = (function () {
    function VetCalcViewModel() { }
    return VetCalcViewModel;
})();
var vcm = new VetCalcViewModel();
vcm.Animal = ko.observable(new Animal());
vcm.Especies = ko.observableArray(especies);
//@ sourceMappingURL=VetCalc.js.map
