import { faker } from '@faker-js/faker/locale/en_US'

export interface UserData {
    fullName: string
    email: string
    currentAddress: string
    permanentAddress: string
    fields: string[]
    values: string[]
}

export class UserDataGeneration {
    static generateUserData() {
        const fullName = faker.person.fullName()
        const email = faker.internet.email({ provider: 'demoqa.com' })
        const streetAddress = faker.location.streetAddress()
        const city = faker.location.city()
        const state = faker.location.state()
        const zipCode = faker.location.zipCode()

        const currentAddress = `${streetAddress}, ${city}, ${state}, ${zipCode}`
        const permanentAddress = `456 Elm St, ${city}, ${state}, ${zipCode}`

        const userData = {
            fullName,
            email,
            currentAddress,
            permanentAddress,
            fields: ['fullName', 'email', 'currentAddress', 'permanentAddress'],
            values: [fullName, email, currentAddress, permanentAddress]
        }

        return userData as UserData & { values: string[] }
    }
}
