class User {
    constructor(firstName = 'Name', lastName = 'LastName', phoneNumber = '5555555555', timestamp = this.generateNewDate(), password = '123456789') {
        this.firstName = firstName
        this.lastName = lastName
        this.phoneNumber = phoneNumber
        this.timestamp = timestamp
        this.email =  this.timestamp + '@catalogi.com'
        this.password = password
    }

    generateNewDate () {
        let getRandomInt = Math.floor(Math.random() * 100)
        return Date.now() + getRandomInt
    }
}

module.exports = { User };