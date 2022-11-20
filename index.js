const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const {Catalogi} = require('./catalogi');
const {User} = require('./user');


(async function main() {
    try{
        const user = new User()
        let url = 'https://catalogi.xyz/en'
        // Signup
        const driver = await new Builder().forBrowser(Browser.CHROME).build()
        const catalogi = new Catalogi(driver, url, user)
        await catalogi.signup()
        // Login
        const driver2 = await new Builder().forBrowser(Browser.CHROME).build()
        const catalogi2 = new Catalogi(driver2, url, user)
        await catalogi2.login()

    }catch(err){
        console.log(err.message)
    }finally {
        console.log('Finally...')
    }
})();