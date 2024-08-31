import { $ } from '@wdio/globals'

export class retirementSavingcalculatorpage {
    public get currentAge() {
        return $('//*[@id="current-age"]');
    }
    public get retirementAge() {
        return $('//*[@id="retirement-age"]');
    }
    public get currentIncome() {
        return $('//*[@id="current-income"]');
    }
    public get spouseIncome() {
        return $('//*[@id="spouse-income"]');
    }
    public get retirementSavings() {
        return $('//*[@id="current-total-savings"]');
    }
    public get contributionPercent() {
        return $('//*[@id="current-annual-savings"]');
    }
    public get increaserateofsavings() {
        return $('//*[@id="savings-increase-rate"]');
    }
    public get Securityoverrideamount() {
        return $('//*[@id="social-security-override"]');
    }
    public get seacurityButton() {
        return $('//*[@id="yes-social-benefits"]');
    }
    public get calculateButton() {
        return $('//*[text()="Calculate"]')
    }
    public get retirementAgeError(){
        return $('//*[@id="invalid-retirement-age-error"]');
    }
    public get currentAgeError(){
        return $('//*[@id="invalid-current-age-error"]');
    }
    public get reslutMessage(){
       return $('//*[@id="result-message"]')
    }
    
  public get maritialStatus(){
    return $('//*[@id="married"]');
  }
}