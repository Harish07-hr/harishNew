import { $ } from '@wdio/globals'
import { BasePage } from './base.page';
import { logger } from './logger';

export class retirementSavingcalculatorpage extends BasePage {
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
    public get increaseRateOfSavings() {
        return $('//*[@id="savings-increase-rate"]');
    }
    public get Securityoverrideamount() {
        return $('//*[@id="social-security-override"]');
    }

    public get calculateButton() {
        return $('//*[text()="Calculate"]')
    }
    public get retirementAgeError() {
        return $('//*[@id="invalid-retirement-age-error"]');
    }
    public get currentAgeError() {
        return $('//*[@id="invalid-current-age-error"]');
    }
    public get reslutMessage() {
        return $('//*[@id="result-message"]')
    }
    public get socialSecurityFields() {
        return $('(//*[@class="row social-security-field"])[1]');

    }
    public get seacurityYesButton() {
        return $('//label[@for="yes-social-benefits"]');
    }
    public get securityNoButton() {
        return $('//label[@for="no-social-benefits"]');
    }
    public get maritalStatus() {
        return $('//label[@for="single"]');
    }
    async enterRetirementCalculatorForm(userData: any): Promise<void> {
        await this.enterText(this.currentAge, userData.currentAge);
        await this.enterText(this.retirementAge, userData.retirementAge);
        await this.enterText(this.currentIncome, userData.currentIncome);
        await this.enterText(this.spouseIncome, userData.spouseIncome);
        await this.enterText(this.retirementSavings, userData.retirementSavings);
        await this.enterText(this.contributionPercent, userData.contributionPercent);
        await this.enterText(this.increaseRateOfSavings, userData.increaseRateOfSavings);
    }


    async submitForm(): Promise<void> {
        logger.info('submitting the retirement calculator form');
        await this.clickElement(this.calculateButton);
    }

    async checkErrorMessage(expectedMessage: string, actualElement: ChainablePromiseElement): Promise<void> {
        logger.info('Checking error messages');
        const actualMessage = await this.getText(actualElement);
        expect(actualMessage).toBe(expectedMessage);
    }
    async validateAgeErrorMessages() {

        const currentAgeValue = await this.getText(this.currentAge);
        if (parseInt(currentAgeValue) > 120) {
            await this.checkErrorMessage('Age cannot be greater than 120', this.currentAgeError);
        }
        const retirementAgeValue = await this.getText(this.retirementAgeError);
        if (parseInt(retirementAgeValue) > 120 || currentAgeValue < retirementAgeValue) {
            await this.checkErrorMessage('Age cannot be greater than 120', this.retirementAgeError);
        } else {
            await this.checkErrorMessage('Planned retirement age must be greater than current age', this.retirementAgeError);
        }
    }


}