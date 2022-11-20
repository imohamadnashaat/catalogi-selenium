const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const {User} = require('./user');


class Catalogi {
    constructor(driver, url = 'https://catalogi.net/en', user = new User()) {
        this.driver = driver
        this.url = url
        this.user = user
        this.sleep = s => new Promise(time => setTimeout(time, s * 1000))
    }

    async signup() {
        await this.driver.get(this.url);
        await this.sleep(1);
        // Landing page
        const getSignupButton = await this.driver.findElement(By.className('store-card-section'));
        await getSignupButton.findElement(By.className('bg-primary-green')).click();
        // Auth0 page
        const firstName = await this.driver.findElement(By.name('firstName'));
        const lastName = await this.driver.findElement(By.name('lastName'));
        const email = await this.driver.findElement(By.name('email'));
        const password = await this.driver.findElement(By.name('password'));
        const phone = await this.driver.findElement(By.name('phone'));
        const storeName = await this.driver.findElement(By.name('storeName'));
        const auth0_login_button = await this.driver.findElement(By.className('submit'));
        // Fill out the form
        await firstName.sendKeys(this.user.firstName);
        await lastName.sendKeys(this.user.lastName);
        await email.sendKeys(this.user.email);
        await password.sendKeys(this.user.password);
        await phone.sendKeys('+90' + this.user.phoneNumber);
        await storeName.sendKeys(this.user.timestamp);
        // Check create button
        do {
            await auth0_login_button.click();
            await this.sleep(1);
        } while (await this.driver.getCurrentUrl() == this.url);
        // Log test data
        this.testData()
    }

    async login() {
        await this.driver.get(this.url);
        await this.sleep(1);
        // Landing page
        const getSignupButton = await this.driver.findElement(By.className('store-card-section'));
        await getSignupButton.findElement(By.className('bg-primary-green')).click();
        const getLoginButton = await this.driver.findElement(By.className('login-link'));
        await getLoginButton.findElement(By.tagName('button')).click();
        // Auth0 page
        const email = await this.driver.findElement(By.name('email'));
        const password = await this.driver.findElement(By.name('password'));
        const auth0_login_button = await this.driver.findElement(By.className('submit'));
        // Fill out the from
        await email.sendKeys(this.user.email);
        await password.sendKeys(this.user.password);
        await auth0_login_button.click();
        await this.sleep(1);
        // Log test data
        this.testData()
    }

    testData() {
        console.log('<<< Test data >>>');
        for (const [key, value] of Object.entries(this.user)) {
            console.log(`${key}: ${value}`);
        }
    }
}


module.exports = { Catalogi };