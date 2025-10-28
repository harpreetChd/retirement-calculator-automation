import RetirementCalculator from '../pageobjects/retirementCalculator.page.js'
import retirementData from '../data/retirementData.json' assert { type: 'json' }

describe('Retirement Calculator', () => {
    it('open the url and calculate retirement savings with all the fields', async () => {
        const retirementCalculator = new RetirementCalculator()
        const data = retirementData.allFeilds
        console.log('start test case - open the url and calculate retirement savings with all the fields')
        await retirementCalculator.openBrowser()
        await retirementCalculator.fillForm(data)
        await retirementCalculator.setDefaultCalculatorValues(data)
        await retirementCalculator.clickCalculate()
        await retirementCalculator.validateResultsPage()
    })
    it('open the url and calculate retirement savings with the mandatory fields and no social security', async () => {
        const retirementCalculator = new RetirementCalculator()
        const data = retirementData.mandatoryFeildsWithNoSocialSecurity
        console.log('start test case - open the url and calculate retirement savings with the mandatory fields and no social security')
        await retirementCalculator.openBrowser()
        await retirementCalculator.fillForm(data)
        await retirementCalculator.setDefaultCalculatorValues(data)
        await retirementCalculator.clickCalculate()
        await retirementCalculator.validateResultsPage()
    })
    it('open the url and calculate retirement savings with the mandatory fields and social security', async () => {
        const retirementCalculator = new RetirementCalculator()
        const data = retirementData.mandatoryFeildsWithSocialSecurity
        console.log('start test case - open the url and calculate retirement savings with the mandatory fields and social security')
        await retirementCalculator.openBrowser()
        await retirementCalculator.fillForm(data)
        await retirementCalculator.setDefaultCalculatorValues(data)
        await retirementCalculator.clickCalculate()
        await retirementCalculator.validateResultsPage()
    })
    it('open the url and calculate retirement savings and update the default values', async () => {
        const retirementCalculator = new RetirementCalculator()
        const data = retirementData.updateDefaultValues
        console.log('start test case - open the url and calculate retirement savings and update the default values')
        await retirementCalculator.openBrowser()
        await retirementCalculator.fillForm(data)
        await retirementCalculator.setDefaultCalculatorValues(data)
        await retirementCalculator.clickCalculate()
        await retirementCalculator.validateResultsPage()
    })
})