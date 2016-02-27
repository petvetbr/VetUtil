/// <reference path="knockout-2.2.d.ts" />
/// <reference path="jquery-1.8.d.ts" />


class Animal {

    volemiaMl: KnockoutObservableNumber;
    weightKg: KnockoutObservableNumber;
    areaM2: KnockoutObservableNumber;
    repoVolumeMl: KnockoutObservableNumber;
    tempMinC: KnockoutObservableNumber;
    tempMaxC: KnockoutObservableNumber;
    dehidrationPercent: KnockoutObservableNumber;
    respMinMPM: KnockoutObservableNumber;
    respMaxMPM: KnockoutObservableNumber;
    heartRateMinBPM: KnockoutObservableNumber;
    heartRateMaxBPM: KnockoutObservableNumber;
    minweight: KnockoutObservableNumber;
    maxweight: KnockoutObservableNumber;
    gestationPeriodMin: KnockoutObservableNumber;
    gestationPeriodMax: KnockoutObservableNumber;
    filled: KnockoutObservableBool;
    species: KnockoutObservableString;

    constructor() {
         this.Init();
        this.calcVitals();
    }

    calcVitals() {
        switch (this.species) {
            case ("canina"):
                {
                    this.GetCanineVitals();
                }
                break;

            case ("felina"):
                {
                    this.GetFelineVitals();
                }
                break;
            case ("suina"):
                {
                    this.GetSwineVitals();
                }
                break;
            case ("bovina"):
                {
                    this.GetBovineVitals();
                }
                break;
            case ("ovina"):
                {
                    this.GetSheepVitals();
                }
                break;
            case ("caprina"):
                {
                    this.GetGoatVitals();
                }
                break;
            case ("equina"):
                {
                    this.GetEquineVitals();
                }
                break;
            default:
                {
                    this.Init();
                }
                break;
        }
    }

    setDehidrationPercent(perc: number) {
        this.dehidrationPercent =ko.observable(perc);
        this.calcRepoVolume();
    };
        calcDehitration() {
        this.calcRepoVolume();
    };
  

    private calcRepoVolume() {
        this.repoVolumeMl = ko.observable(this.dehidrationPercent() * this.weightKg()*10);
    };
    public Init() {
        this.species = ko.observable("");
        this.weightKg =ko.observable( 0);
        this.volemiaMl =ko.observable( 0);
        this.areaM2 =ko.observable( 0);
        this.repoVolumeMl =ko.observable( 0);
        this.tempMinC =ko.observable( 0);
        this.tempMaxC = ko.observable(0);
        this.respMinMPM = ko.observable(0);
        this.respMaxMPM = ko.observable(0);
        this.heartRateMinBPM =ko.observable( 0);
        this.heartRateMaxBPM = ko.observable(0);
        this.dehidrationPercent = ko.observable(0);
        this.minweight =ko.observable( 0);
        this.maxweight =ko.observable( 0);
        this.gestationPeriodMin =ko.observable( 0);
        this.gestationPeriodMax =ko.observable( 0);
        this.filled = ko.observable(false);
    }
    private GetCanineVitals() {

        if (this.weightKg() > 0) {
            this.volemiaMl =ko.observable( this.weightKg() * 0.09 * 1000);
            this.calcRepoVolume();
            this.areaM2 = ko.observable((10.1 * Math.pow(this.weightKg(), 0.67)) / 100);
        }
        this.maxweight =ko.observable(120);
        this.gestationPeriodMin =ko.observable(59);
        this.gestationPeriodMax =ko.observable(65);


        this.heartRateMinBPM =ko.observable(70);
        //small breeds/puppies
        if (this.weightKg() < 5) {
            this.heartRateMaxBPM =ko.observable(180);
        }
            //everybody else
        else {
            this.heartRateMaxBPM =ko.observable(160);
        }
        this.respMinMPM =ko.observable(10);
        this.respMaxMPM =ko.observable(30);
        this.tempMinC =ko.observable(38);
        this.tempMaxC =ko.observable(39.2);
        this.filled =ko.observable(true);

    };
    private GetFelineVitals() {

        if (this.weightKg() > 0) {
            this.volemiaMl =ko.observable(this.weightKg() * 0.045 * 1000);
            this.calcRepoVolume();
            this.areaM2 =ko.observable((10.4 * Math.pow(this.weightKg(), 0.67)) / 100);
        }
        this.maxweight =ko.observable(20);
        this.gestationPeriodMin =ko.observable(60);
        this.gestationPeriodMax =ko.observable(70);
        this.heartRateMinBPM =ko.observable(160);
        this.heartRateMaxBPM =ko.observable(240);

        this.respMinMPM =ko.observable(26);
        this.respMaxMPM =ko.observable(30);
        this.tempMinC =ko.observable(37.8);
        this.tempMaxC =ko.observable(39.4);
        this.filled =ko.observable(true);

    };
    private GetEquineVitals() {
        if (this.weightKg() > 0) {
            this.volemiaMl =ko.observable(this.weightKg() * 0.076 * 1000);
            this.calcRepoVolume();
        };
        this.minweight =ko.observable(30);
        this.maxweight =ko.observable(1800);
        this.gestationPeriodMin =ko.observable(315);
        this.gestationPeriodMax =ko.observable(370);

        this.areaM2 =ko.observable(0); //(10.4 * Math.pow(weightKg, 0.67)) / 100);


        this.heartRateMinBPM =ko.observable(28);
        this.heartRateMaxBPM =ko.observable(40);

        this.respMinMPM =ko.observable(10);
        this.respMaxMPM =ko.observable(14);
        this.tempMinC =ko.observable(37.2);
        this.tempMaxC =ko.observable(38.3);
        this.filled =ko.observable(true);

    }
    private GetBovineVitals() {

        if (this.weightKg() > 0) {
            this.volemiaMl =ko.observable(this.weightKg() * 0.06 * 1000);
            this.calcRepoVolume();
        };
        this.minweight =ko.observable(30);
        this.maxweight =ko.observable(2000);
        this.gestationPeriodMin =ko.observable(280);
        this.gestationPeriodMax =ko.observable(290);
        this.areaM2 =ko.observable(0); //(10.4 * Math.pow(weightKg, 0.67)) / 100);

        this.heartRateMinBPM =ko.observable(48);
        this.heartRateMaxBPM =ko.observable(84);

        this.respMinMPM =ko.observable(26);
        this.respMaxMPM =ko.observable(50);
        this.tempMinC =ko.observable(37.2);
        this.tempMaxC =ko.observable(38.3);
        this.filled =ko.observable(true);

    }
    private GetSheepVitals() {
        this.minweight =ko.observable(1);
        this.maxweight =ko.observable(150);
        if (this.weightKg() > 0) {
            this.volemiaMl =ko.observable(this.weightKg() * 0.06 * 1000);

        };
        this.gestationPeriodMin =ko.observable(142);
        this.gestationPeriodMax =ko.observable(152);
        this.areaM2 =ko.observable(0); //(10.4 * Math.pow(weightKg, 0.67)) / 100);

        this.calcRepoVolume();
        this.heartRateMinBPM =ko.observable(70);
        this.heartRateMaxBPM =ko.observable(80);

        this.respMinMPM =ko.observable(16);
        this.respMaxMPM =ko.observable(34);
        this.tempMinC =ko.observable(38.3);
        this.tempMaxC =ko.observable(39.4);
        this.filled =ko.observable(true);

    }
    private GetGoatVitals() {
        this.minweight =ko.observable(1);
        this.maxweight =ko.observable(100);
        if (this.weightKg() > 0) {
            this.volemiaMl =ko.observable(this.weightKg() * 0.07 * 1000);

        };
        this.gestationPeriodMin =ko.observable(145);
        this.gestationPeriodMax =ko.observable(155);
        this.areaM2 =ko.observable(0); //(10.4 * Math.pow(weightKg, 0.67)) / 100);

        this.calcRepoVolume();
        this.heartRateMinBPM =ko.observable(70);
        this.heartRateMaxBPM =ko.observable(80);

        this.respMinMPM =ko.observable(10);
        this.respMaxMPM =ko.observable(16);
        this.tempMinC =ko.observable(38.2);
        this.tempMaxC =ko.observable(40.7);
        this.filled =ko.observable(true);

    }
    private GetSwineVitals() {
        this.minweight =ko.observable(1);
        this.maxweight =ko.observable(500);
        if (this.weightKg() > 0) {
            this.volemiaMl =ko.observable(this.weightKg() * 0.06 * 1000);

        };
        this.areaM2 =ko.observable(0); //(10.4 * Math.pow(weightKg, 0.67)) / 100);
        this.gestationPeriodMin =ko.observable(112);
        this.gestationPeriodMax =ko.observable(114);
        this.calcRepoVolume();
        this.heartRateMinBPM =ko.observable(70);
        this.heartRateMaxBPM =ko.observable(120);

        this.respMinMPM =ko.observable(8);
        this.respMaxMPM =ko.observable(18);
        this.tempMinC =ko.observable(38.0);
        this.tempMaxC =ko.observable(39.5);
        this.filled =ko.observable(true);

    }

}

