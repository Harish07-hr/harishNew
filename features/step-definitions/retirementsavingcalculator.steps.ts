import { Given, When, Then } from '@wdio/cucumber-framework'
import { expect, browser } from '@wdio/globals'
import { getCSVFilePath, getDataForUser } from '../pageobjects/utils';
import { retirementSavingcalculatorpage } from '../pageobjects/retirementsavingcalculator.page';
const retirementSavingcalculator = new retirementSavingcalculatorpage();
let userData: any;


Given('User open the retirement calculator page', async () => {
    await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html')
});

When('user submit the form', async () => {
    await retirementSavingcalculator.calculateButton.click();
});

Then('user should see the estimated retirement needs', async () => {
    await retirementSavingcalculator.reslutMessage.isDisplayed();
});


Then('user can able to see the error messages in current age and ritrement age filed', async () => {

    const currentagevalue = await retirementSavingcalculator.currentAge.getValue();

    if (currentagevalue > 120) {
        const currentAgeErrorMessage = retirementSavingcalculator.currentAgeError;

        await expect(currentAgeErrorMessage).toBeDisplayed();

        const currentAgeErroMessage = await currentAgeErrorMessage.getText();

        const expectedcurrentAgeErroMessage = 'Age cannot be greater than 120';

        await expect(currentAgeErroMessage).toBe(expectedcurrentAgeErroMessage);
    }

    const retirementAgeErrorMessage = retirementSavingcalculator.retirementAgeError;

    await expect(retirementAgeErrorMessage).toBeDisplayed();

    const retirementAgeErroMessage = await retirementAgeErrorMessage.getText();

    if (retirementAgeErroMessage === 'Age cannot be greater than 120') {
        const expectedretirementAgeErroMessage = 'Age cannot be greater than 120';
    } else {
        const expectedretirementAgeErroMessage = 'Planned retirement age must be greater than current age';
        await expect(retirementAgeErroMessage).toBe(expectedretirementAgeErroMessage);
    }

});
When('user should enter the {string}', async (retirementData: string) => {
    userData = await getDataForUser(getCSVFilePath('retirementData.csv'), retirementData);
    await retirementSavingcalculator.currentAge.setValue(userData.currentAge);
    await retirementSavingcalculator.retirementAge.setValue(userData.retirementAge);

    await retirementSavingcalculator.retirementAge.setValue(userData.retirementAge);
    await retirementSavingcalculator.currentIncome.click()

    await retirementSavingcalculator.currentIncome.setValue(userData.currentIncome);
    await retirementSavingcalculator.spouseIncome.click()

    await retirementSavingcalculator.spouseIncome.setValue(userData.spouseIncome);
    await retirementSavingcalculator.retirementSavings.click()

    await retirementSavingcalculator.retirementSavings.setValue(userData.retirementSavings);
    await retirementSavingcalculator.contributionPercent.click()

    await retirementSavingcalculator.contributionPercent.setValue(userData.contributionPercent);
    await retirementSavingcalculator.increaserateofsavings.click()

    await retirementSavingcalculator.increaserateofsavings.setValue(userData.increaserateofsavings);
});
Then('user should the enter the Social Security override amount', async () => {
    const securityValue = retirementSavingcalculator.Securityoverrideamount
    const SSamount = userData.socialsecurityAmmount;

    securityValue.click();
    securityValue.setValue(SSamount);



});

Then('user sholud click Social Security benefits and choose maritial status', async () => {
    const securityButton = retirementSavingcalculator.seacurityButton
    securityButton.waitForDisplayed({ timeout: 5000 });
    securityButton.click();

    const maritialStatus = retirementSavingcalculator.maritialStatus;
    maritialStatus.isDisplayed();
    maritialStatus.click();

});


