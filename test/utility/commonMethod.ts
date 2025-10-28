/**
 * CommonMethods class consits of
 *  1. open browser method
 *  2. common methods across mulitple files
 **/

export default class CommonMethods {
    /**
     * enterText method checks if
     * 1. the value is not null and undefined
     * 2. the value is not empty
     * 3. element is displayed
     * 4. clear the values and set the value
     **/
    async enterText(element: ChainablePromiseElement, data: string | number | null | undefined) {
        if (data !== null && data !== undefined){
            if ( data.toString().trim() !== '' ){
                await element.scrollIntoView()
                await element.isDisplayed()
                await element.waitForDisplayed({ timeout: 5000 })
                await element.waitForEnabled({ timeout: 5000 })
                await element.click()
                await element.clearValue()
                await element.waitForEnabled({ timeout: 5000 })
                await element.setValue(data)
            }
        }
    }

    /**
     * clickButton method checks if
     * 1. element is enabled and displayed
     * 2. click on the element
     * 3. wait for sometime for the action to be completed
     **/
    async clickButton(element: ChainablePromiseElement) {
        await element.waitForDisplayed({ timeout: 5000 })
        await element.waitForEnabled({ timeout: 5000 })
        await element.click()
        await browser.setTimeout({ 'implicit':3000 })
    }

    /**
     * waitForPageToLoad method will wait for the page and the content of the page to load
    **/
    async waitForPageToLoad(){
        await browser.waitUntil(async () => {
            const state = await browser.execute(() => document.readyState)
            return state === 'complete'
        }, {
            timeout: 10000,
            timeoutMsg: 'Page did not fully load within 10s'
        })
        await browser.setTimeout({ 'implicit':5000 })

        const mainContent = await $('#content')
        await mainContent.waitForDisplayed({ timeout: 3000 })
    }

    /**
     * validateText method will validate the text of the element wrt to the expected text
    **/
    async validateText(element: ChainablePromiseElement, expText: string) {
        await this.sleepMethod(5000)
        await element.waitForDisplayed({ timeout: 5000 })
        await element.waitForEnabled({ timeout: 5000 })
        await expect(element).toHaveText(expText)
    }

    sleepMethod(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    /**
     * openBrowser method will open the browser and accept the cookies of the page if any
    **/
    async openBrowser() {
        await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html')
        await browser.maximizeWindow()
        await this.waitForPageToLoad()
        await this.sleepMethod(2000)
        const cookies = await $('#onetrust-accept-btn-handler')
        if (await cookies.isDisplayed() && await cookies.isEnabled()) {
            await this.waitForPageToLoad()
            await this.sleepMethod(1000)
            await cookies.click()
            await this.sleepMethod(2000)
        }
    }

    /**
     * closeBrowser method will close the browser window
    **/
    async closeBrowser() {
        await browser.closeWindow()
    }
}