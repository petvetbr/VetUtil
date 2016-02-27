/// <reference path="util.ts" />
/// <reference path="animal.ts" />
/// <reference path="jqueryui-1.9.d.ts" />
/// <reference path="knockout-2.2.d.ts" />
/// <reference path="jquery-1.8.d.ts" />
var zero = '0';
class KeyValue {

    constructor(public key: string, public value: string) {
    };
}

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



var maxAnimalWeight: number;
var minAnimalWeight: number;
var DehitrationPercent: number;
var kg: number = 0;
var g: number = 0;

$(document).ready(() => {
    var ux = new Ux();

    $('#lbEmail').mouseover(() => {
        ux.showEmail();
    });
    $('#lbMsn').mouseover(() => {
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
    $("#txKg").keyup(() => {
        ux.txWeightChange();
    });
    $("#txKg").change(() => {
        ux.txWeightChange();
    });
    $("#txGrams").keyup(() => {
        ux.txWeightChange();
    });

    $("#txGrams").change(() => {
        ux.txWeightChange();
    });
    $("#txKg").click(() => {
        ux.txWeightChange();
    });
    $("#txGrams").click(() => {
        ux.txWeightChange();
    });
    //$("#txKg").mousewheel(()=> {
    //    txWeightChange();
    //});
    //$("#txGrams").mousewheel(()=> {
    //    txWeightChange();
    //});
    $("#slSpecies").click(() => {
        ux.SpeciesChange();
    });
    $("#txDosagem").keyup(() => {
        ux.recalcDosage();
    });
    $("#txDosagem").change(() => {
        ux.recalcDosage();
    });
    $("#txDosagem").click(() => {
        ux.recalcDosage();
    });
    //$("#txDosagem").mousewheel(()=> {
    //    recalcDosage();
    //});
    $("#slUnidadeDroga").change(() => {
        ux.dosageUnitChange();
    });
    $("#txApresentacao").keyup(() => {
        ux.recalcDosage();
    });
    $("#txApresentacao").change(() => {
        ux.recalcDosage();
    });
    $("#txApresentacao").click(() => {
        ux.recalcDosage();
    });
    //$("#txApresentacao").mousewheel(()=> {
    //    recalcDosage();
    //});
    $("#slApresentacao").change(() => {
        ux.dosagePresentationChange();
    });
    $("#txHidratacao").keyup(() => {
        ux.Change();
    });
    $("#txHidratacao").change(() => {
        ux.Change();
    });
    $("#txHidratacao").click(() => {
        ux.Change();
    });



    var dataPadrao = new Date();
    ux.bindGestation("#txGestDia", dataPadrao.getDate());
    ux.bindGestation("#txGestMes", dataPadrao.getMonth() + 1);
    ux.bindGestation("#txGestAno", dataPadrao.getFullYear());

    ux.SpeciesChange();
    ux.dosageUnitChange();
});

class Ux {
    public bindGestation(controlId, valorPadrao) {
        var control = $(controlId);

        control.change(() => {
            Calc.calcGestation();
        });

        if (valorPadrao) {
            control.val(valorPadrao);
        }
    };
    public showEmail() {
        $("#lbEmail").text("e-mail/gtalk: petvetbr@gmail.com");
    }
    public showMSN() {
        $("#lbMsn").text("msn: fe@pobox.com");
    }
    public ResetValues() {
        maxAnimalWeight = 0;
        if (vcm.Animal()) {
            vcm.Animal().Init();
        }

        $("#txKg").val(zero);
        $("#txGrams").val(zero);
        $("#txDosagem").val(zero);
        $("#txApresentacao").val(zero);
        $("#txHidratacao").val(zero);
        this.txWeightChange();
    }
    public Change() {
        var weight: number = (kg + (g / 1000));
        if (!vcm.Animal()) {
            vcm.Animal = ko.observable(new Animal());
        }
        vcm.Animal().weightKg = ko.observable(weight);
        vcm.Animal().calcVitals();

        this.HidratationChange();
        this.recalcDosage();
        Calc.calcGestation();
        ko.applyBindings(vcm);
    }



    public SpeciesChange() {
        this.ResetValues();
        species = $("#slSpecies").val();
        // if (!vcm.Animal()) {
        vcm.Animal = ko.observable(new Animal());
        //}
        vcm.Animal().species = species;
        vcm.Animal().calcVitals();
        maxAnimalWeight = vcm.Animal().maxweight();
        minAnimalWeight = vcm.Animal().minweight();
        this.Change();
    }
    ;
    public dosageUnitChange() {
        var dosageDisplay = $("#slUnidadeDroga :selected").text().split("/")[0];
        $("#lbUnidadeDose").text(dosageDisplay);
        this.recalcDosage();
    }
    ;
    public dosagePresentationChange(): void {
        this.recalcDosage();
    }
    public recalcDosage() {
        var dosage = parseFloat($("#txDosagem").val());
        var unit = $("#slUnidadeDroga").val();
        var presentationDosage = parseFloat($("#txApresentacao").val());
        var resultado = Calc.calcDosage(dosage, unit, presentationDosage);
        $("#lbPresentationDosage").text(resultado.doseApresentacao.toFixed(2));
        $("#lbResultadoDose").text(resultado.dose.toFixed(2));
    }
    public HidratationChange() {
        DehitrationPercent = $("#txHidratacao").val();
        if (vcm.Animal()) {
            vcm.Animal().setDehidrationPercent(DehitrationPercent);
            vcm.Animal().calcDehitration();

        }
    }
    ;
    public txWeightChange() {
        var kgInput = $("#txKg").val();
        var gInput = $("#txGrams").val();
        var gValid = Utility.IsNumeric(gInput, 0, 999);
        var kgValid = Utility.IsNumeric(kgInput, 0, maxAnimalWeight);
        if (kgValid) {
            $("#txKg").css("background-color: #FFFFFF");
            kg = parseInt(kgInput);
        } else {
            $("#txKg").css("background-color: #FF6699");
        }
        if (gValid) {
            $("#txGrams").css("background-color: #FFFFFF");
            g = parseInt(gInput);
        } else {
            $("#txGrams").css("background-color: #FF6699");
        }
        var display = "Peso total: " + kg + " kg " + g + "g";
        var weight: number = kg + (g / 1000);
        $("#lbKg").text(display);
        this.Change();
    }
    ;
}
class Calc {
    static calcGestation() {
        var dataCruzamento: Date = this.ObterDataCruzamento();
        if (dataCruzamento) {
            var dtaPartoMin = this.ObterDataCruzamento();
            dtaPartoMin.setDate(dataCruzamento.getDate() + vcm.Animal().gestationPeriodMin());
            var dtaPartoMax: Date = this.ObterDataCruzamento();
            dtaPartoMax.setDate(dataCruzamento.getDate() + vcm.Animal().gestationPeriodMax());
            if (dtaPartoMin && dtaPartoMax) {
                var util = new Util();
                $("#lbDataPartoMin").text(util.FormatDate(dtaPartoMin));
                $("#lbDataPartoMax").text(util.FormatDate(dtaPartoMax));
            }
        }
        else {
            var strDataInvalida = 'Data de cruzamento inválida';
            $("#lbDataPartoMin").text(strDataInvalida);
            $("#lbDataPartoMax").text(strDataInvalida);
        }
    };
    static ObterDataCruzamento(): Date {

        var dia = parseInt($("#txGestDia").val(), 10);
        var mes = parseInt($("#txGestMes").val(), 10);
        var ano = parseInt($("#txGestAno").val(), 10);
        if (mes > 0 && mes <= 12) {
            //fevereiro
            if (mes === 2) {
                if (ano % 4 === 0 && ano % 400 != 0) {
                    if (dia < 0 || dia > 29) {
                        return null;
                    }
                }
                else {
                    if (dia < 0 || dia > 28) {
                        return null;
                    }
                }
            }
            //meses com 31 dias
            else if (mes === 1 || mes === 3 || mes === 5 || mes === 7 || mes === 8 || mes === 10 || mes === 12) {
                if (dia < 0 || dia > 31) {
                    return null;
                }
            }
            //meses com 30
            else {
                if (dia < 0 || dia > 30) {
                    return null;
                }
            }

            return new Date(ano, (mes - 1), dia);
        }

        return null;
    };

    static calcDosage(dosage: number, unit: string, presentationDosage: number): dosagem {
        var retorno = new dosagem();
        var dose = 0;
        var dosemg = 0;
        var doseApresentacao = 0;
        var isDoseML = false;
        if (isNaN(dosage)) {
            dose = null;
        } else {
            switch (unit.substring(2)) {
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
            if (unitscale == "g") {
                dosemg = dose * 1000;
            } else {
                if (unitscale == "ug") {
                    dosemg = dose / 1000;
                } else {
                    dosemg = dose;
                }
            }
            if (isNaN(presentationDosage)) {
                if (!isDoseML) {
                    doseApresentacao = 0;
                }
            }
            else {
                string:unit  = $("#slApresentacao").val();
                switch (unit) {
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
    }
}





class Utility {
    static isNumber(value) {
        return isFinite(value);
    };
    
    static IsNumeric(input, min, max) {
        var retvalue = false;
        if (Utility.isNumber(input)) {
            if (input >= min && input <= max) {
                return true;
            }
        }
        return retvalue;
    }
}


class dosagem {
    dose: number;
    doseApresentacao: number;
}
class VetCalcViewModel {
    Animal: KnockoutObservableAny; Especies: KnockoutObservableArray;
}
var vcm = new VetCalcViewModel();
vcm.Animal = ko.observable(new Animal());
vcm.Especies = ko.observableArray(especies);