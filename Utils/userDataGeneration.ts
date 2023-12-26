import { faker } from '@faker-js/faker/locale/en_US'

export interface UserData {
    fullName: string
    email: string
    currentAddress: string
    permanentAddress: string
}

export class UserDataGeneration {
    static generateUserData() {
        const fullName = faker.person.fullName()
        const email = faker.internet.email({ provider: 'demoqa.com' })
        const streetAddress = faker.location.streetAddress()
        const city = faker.location.city()
        const state = faker.location.state()
        const zipCode = faker.location.zipCode()

        const minAge = 18
        const maxAge = 120
        const age = faker.date.between({ from: minAge, to: maxAge })

        const salary = faker.finance.amount(5, 10, 5, '', true)
        const department = faker.person.jobArea()
        const currentAddress = `${streetAddress}, ${city}, ${state}, ${zipCode}`
        const permanentAddress = `456 Elm St, ${city}, ${state}, ${zipCode}`

        const userData = {
            fullName,
            email,
            age,
            salary,
            department,
            currentAddress,
            permanentAddress
        }

        return userData
    }
}
