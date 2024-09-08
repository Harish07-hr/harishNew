/** import { Given, When, Then } from '@wdio/cucumber-framework'
import { expect, browser } from '@wdio/globals'

import { getCSVFilePath, getDataForUser } from '../pageobjects/utils';
import { retirementSavingcalculatorpage } from '../pageobjects/retirementsavingcalculator.page';
const retirementSavingcalculator = new retirementSavingcalculatorpage();
let userData: any;


Given('User open the retirement calculator page', async () => {
    return browser.url('https://www.securian.com/insights-tools/retirement-calculator.html')
    // 
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
    await retirementSavingcalculator.increaseRateOfSavings.click()

    await retirementSavingcalculator.increaseRateOfSavings.setValue(userData.increaserateofsavings);
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
*/

import { Given, When, Then } from '@wdio/cucumber-framework';
import { getCSVFilePath, getDataForUser } from '../pageobjects/utils';
import { retirementSavingcalculatorpage } from '../pageobjects/retirementsavingcalculator.page';
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
    // const isDisplayed = await retirementSavingCalculator.isElementDisplayed(retirementSavingCalculator.reslutMessage);
    // expect(isDisplayed).toBe(true);
    await retirementSavingCalculator.reslutMessage.isDisplayed();
});

Then('User should see the error messages in current age and retirement age fields', async () => {
    /**  try {
          logger.info('Submitting the form with invalid age credentials');
  
          // Submit the form with invalid credentials
          await retirementSavingCalculator.submitForm();
  
          // Wait for and verify error messages
          const currentAgeErrorMessage = await retirementSavingCalculator.currentAgeError.getText();
          const retirementAgeErrorMessage = await retirementSavingCalculator.retirementAgeError.getText();
  
          // Expected error messages
          const expectedCurrentAgeError = 'Age cannot be greater than 120';
          const expectedRetirementAgeError = 'Planned retirement age must be greater than current age';
  
          // Use toEqual for better comparison of text
          expect(currentAgeErrorMessage.trim()).toEqual(expectedCurrentAgeError);
          expect(retirementAgeErrorMessage.trim()).toEqual(expectedRetirementAgeError);
  
          logger.info('Error messages for current age and retirement age fields are displayed as expected');
      } catch (error) {
          logger.error('Failed to verify error messages for invalid age credentials:', error);
          throw error; // Re-throw the error to ensure the test fails
      }*/

    logger.info('Checking error messages for age fields');
    const currentAgeValue = await retirementSavingCalculator.getText(retirementSavingCalculator.currentAge);
    if (parseInt(currentAgeValue) > 120) {
        await retirementSavingCalculator.checkErrorMessage('Age cannot be greater than 120', retirementSavingCalculator.currentAgeError);
    }
    const retirementAgeValue = await retirementSavingCalculator.getText(retirementSavingCalculator.retirementAgeError);
    if (parseInt(retirementAgeValue) > 120 || currentAgeValue < retirementAgeValue) {
        await retirementSavingCalculator.checkErrorMessage('Age cannot be greater than 120', retirementSavingCalculator.retirementAgeError);
    } else {
        await retirementSavingCalculator.checkErrorMessage('Planned retirement age must be greater than current age', retirementSavingCalculator.retirementAgeError);
    }
    /**  try {
         logger.info('Checking error messages for age fields');
 
         const currentAgeValue = await retirementSavingCalculator.currentAge.getValue();
 
         // Check if current age value is greater than 120 and verify corresponding error message
         if (parseInt(currentAgeValue, 10) > 120) {
             await retirementSavingCalculator.checkErrorMessage(
                 'Age cannot be greater than 120',
                 retirementSavingCalculator.currentAgeError
             );
         }
 
         // Check the retirement age field for error messages
         await retirementSavingCalculator.checkErrorMessage(
             'Planned retirement age must be greater than current age||Age cannot be greater than 120',
             retirementSavingCalculator.retirementAgeError
         );
 
         logger.info('Error messages for age fields verified successfully');
     } catch (error) {
         logger.error('Failed to verify error messages for age fields:', error);
         throw error; // Re-throw the error to ensure the test fails
     }*/
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
    /**const radioSecurityButton = retirementSavingCalculator.seacurityButton;
    await radioSecurityButton.scrollIntoView();
    // await retirementSavingCalculator.seacurityButton.waitForClickable({ timeout: 5000 });  
    await retirementSavingCalculator.clickElement(radioSecurityButton);
    // await retirementSavingCalculator.maritialStatus.isExisting(); */ 
    // await retirementSavingCalculator.maritialStatus.waitForClickable({ timeout: 5000 });  
    const radioMaritialStatusButton = retirementSavingCalculator.maritialStatus;
    await radioMaritialStatusButton.scrollIntoView();
 await retirementSavingCalculator.clickElement(radioMaritialStatusButton);

    // const socialSecurityButton = await retirementSavingCalculator.seacurityButton;
    // await browser.execute("arguments[0].click();", socialSecurityButton); 
    // const maritalStatusOption = await retirementSavingCalculator.maritialStatus;
    // await maritalStatusOption.click();*/
});
