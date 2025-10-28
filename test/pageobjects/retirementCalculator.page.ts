/**
 * RetirementCalculator class consits of
 *  1. web elements
 *  2. methods to perform action on the web elements
 **/

import CommonMethods from '../utility/commonMethod'

export default class RetirementCalculator extends CommonMethods {
    get acceptCookies(){return $('#onetrust-accept-btn-handler')}
    get currentAge () { return $('//*[@id="current-age"]')}
    get retirementAge () { return $('#retirement-age')}
    get spouseIncome () { return $('#spouse-income')}
    get currentIncome () { return $('#current-income')}
    get currentTotalSavings () { return $('#current-total-savings')}
    get currentAnnualSavingsPercent () { return $('#current-annual-savings')}
    get savingsIncreaseRateYearly () { return $('#savings-increase-rate')}
    get includeSocialBenefit () { return $('//*[@id="yes-social-benefits"]/following-sibling::label')}
    get dontIncludeSocialBenefit () { return $('//*[@id="no-social-benefits"]/following-sibling::label')}
    get maritalStatusSingle () { return $('//*[@id="single"]/following-sibling::label')}
    get maritalStatusMarried () { return $('//*[@id="married"]/following-sibling::label')}
    get socialSecurityOverride () { return $('#social-security-override')}
    get adjustDefaultValues () { return $('=Adjust default values')}
    get otherIncome () { return $('#additional-income')}
    get retirementDuration () { return $('#retirement-duration')}
    get includeInflation () { return $('//*[@id="include-inflation"]/following-sibling::label')}
    get excludeInflation () { return $('//*[@id="exclude-inflation"]/following-sibling::label')}
    get expectedInflationRate () { return $('#expected-inflation-rate')}
    get retirementAnnualIncome () { return $('#retirement-annual-income')}
    get preRetirementROI () { return $('#pre-retirement-roi')}
    get postRetirementROI () { return $('#post-retirement-roi')}
    get saveDefaultValuesBttn () { return $('//div[button[text()="Save changes"]]/button')}
    get calculateBttn () { return $('//div[button[text()="Calculate"]]/button')}
    get resultsText () { return $('//h3[text()="Results"]')}

    /**
     * fillForms method takes the json as input
     * it will update all the fields available on the first page
     * if -else conditions are provided to check the toggle wrt to the values given in the json
     **/
    async fillForm(retirementData:any) {
        await this.waitForPageToLoad()
        await this.sleepMethod(2000)
        await this.enterText(this.currentAge, retirementData.currentAge)
        await this.enterText(this.retirementAge, retirementData.retirementAge)
        await this.enterText(this.currentIncome, retirementData.currentIncome)
        await this.enterText(this.spouseIncome, retirementData.spouseIncome)
        await this.enterText(this.currentTotalSavings, retirementData.currentSavings)
        await this.enterText(this.currentAnnualSavingsPercent, retirementData.currentContribution)
        await this.enterText(this.savingsIncreaseRateYearly, retirementData.annualContributionIncrease)
        if (retirementData.socialSecurity === 'Yes'){
            await this.clickButton(this.includeSocialBenefit)
            if (retirementData.realtionshipStatus === 'Married'){
                await this.clickButton(this.maritalStatusMarried)
            } else {
                await this.clickButton(this.maritalStatusSingle)
            }
            await this.enterText(this.socialSecurityOverride, retirementData.socialSecurityOverride)
        } else {
            await this.clickButton(this.dontIncludeSocialBenefit)
        }
    }

    /**
     * clickCalcuate() method will click on the Calculate button on the page
     **/
    async clickCalculate() {
        await this.waitForPageToLoad()
        await this.sleepMethod(2000)
        await this.clickButton(this.calculateBttn)
        await this.waitForPageToLoad()
    }

    /**
     * setDefaultCalculatorValues method takes the json as input
     * it will update all the fields available for the default fields
     * if -else conditions are provided to check the toggle wrt to the values given in the json
     **/
    async setDefaultCalculatorValues(retirementData:any) {
        if (retirementData.updateDefaultValues === 'Yes'){
            await this.clickButton(this.adjustDefaultValues)
            await this.waitForPageToLoad()
            console.log('other value is' + retirementData.otherIncome)
            await this.sleepMethod(2000)
            await this.enterText(this.otherIncome, retirementData.otherIncome)
            await this.enterText(this.retirementDuration, retirementData.retirementYears)
            if (retirementData.postRetirementInflation === 'Yes'){
                await this.clickButton(this.includeInflation)
                await this.enterText(this.expectedInflationRate, retirementData.inflationRate)
            } else {
                await this.clickButton(this.excludeInflation)
            }
            await this.enterText(this.retirementAnnualIncome, retirementData.desiredIncomePercent)
            await this.enterText(this.preRetirementROI, retirementData.preRetirementReturn)
            await this.enterText(this.postRetirementROI, retirementData.postRetirementReturn)
            await this.clickButton(this.saveDefaultValuesBttn)
            await this.calculateBttn.waitForClickable({ timeout: 5000 })
        }
    }

    /**
     * validateResultsPage method validate the text on the final page
     **/
    async validateResultsPage() {
        await this.waitForPageToLoad()
        await this.sleepMethod(1000)
        await this.validateText(this.resultsText, 'Results')
    }
}