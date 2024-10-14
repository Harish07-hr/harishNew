import { Given, When, Then } from '@wdio/cucumber-framework';
import { getCSVFilePath, getDataForUser } from '../pageobjects/utils';
import { retirementSavingcalculatorpage } from '../pageobjects/retirementSavingCalculator.page';
import { logger } from '../pageobjects/logger';  // Import the logger

const retirementSavingCalculator = new retirementSavingcalculatorpage();
let userData: any;

Given('User opens the retirement calculator page', async () => {
    logger.info('Navigating to the retirement calculator page');
    await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
    await browser.maximizeWindow();
});

When('User submits the retirement calculator form', async () => {
    logger.info('Submitting the retirement calculator form');
    await retirementSavingCalculator.submitForm();
});

Then('User should see the estimated retirement needs', async () => {
    logger.info('Verifying the estimated retirement needs');
    await retirementSavingCalculator.reslutMessage.isDisplayed();
});

Then('user should see the error message for " currentAge|RetirementInvalid " fields', async () => {

    logger.info('Checking error messages for age fields');
    await retirementSavingCalculator.validateAgeErrorMessages();
});

When('User enters the {string}', async (retirementData: string) => {
    logger.info(`Entering data for retirement calculation: ${retirementData}`);
    userData = await getDataForUser(getCSVFilePath('retirementData.csv'), retirementData);
    await retirementSavingCalculator.enterRetirementCalculatorForm(userData);
});

Then('User should enter the Social Security override amount', async () => {
    logger.info('Entering Social Security override amount');
    await retirementSavingCalculator.enterText(retirementSavingCalculator.Securityoverrideamount, userData.socialSecurityAmount);
});

Then('User should click Social Security benefits and choose marital status', async () => {
    logger.info('Selecting Social Security benefits and marital status');

    await browser.execute(() => {
        const radioButton = document.getElementById('yes-social-benefits');
        if (radioButton) {
            radioButton.click();
        }
    });

    const radiomaritalStatusButton = retirementSavingCalculator.maritalStatus;
    await radiomaritalStatusButton.scrollIntoView();
    await retirementSavingCalculator.clickElement(radiomaritalStatusButton);

});


When(/^user selects social security field as "yes" on pre-retirement calculator$/, async () => {
    logger.info('Selecting "Yes" for social security field');
    await retirementSavingCalculator.seacurityYesButton.click();
});

Then(/^user should "see" social security fields as visible$/, async () => {
    logger.info('Verifying if social security fields are visible');
    const isVisible = await retirementSavingCalculator.socialSecurityFields.isDisplayed();
    if (isVisible) {
        logger.info('Social security fields are visible as expected');
    } else {
        logger.error('Social security fields are NOT visible');
    }
});

When(/^user selects social security field as "no" on pre-retirement calculator$/, async () => {
    logger.info('Selecting "No" for social security field');
    await retirementSavingCalculator.securityNoButton.click();
});

Then(/^user should "not see" social security fields as visible$/, async () => {
    logger.info('Verifying if social security fields are not visible');
    const isVisible = await retirementSavingCalculator.socialSecurityFields.isDisplayed();
    if (!isVisible) {
        logger.info('Social security fields are hidden as expected');
    } else {
        logger.error('Social security fields are still visible');
    }
});
