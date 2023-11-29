import { test, expect } from "playwright/test";
import { faker } from "@faker-js/faker/locale/en_US";
import TextBoxPage from "../srs/main/demoApp/TextBoxPage";

test.describe("@Demoqa Text Box Tests", () => {
  test("TC: Fill out input text fields by data from faker lib", async ({
    page,
  }) => {
    const textBox = new TextBoxPage(page);
    const fullName = faker.person.fullName();
    const email = faker.internet.email({provider: 'demoqa.com'});

    let streetAddress = faker.location.streetAddress();
    let city = faker.location.city();
    let state = faker.location.state();
    let zipCode = faker.location.zipCode();
    
    const currentAddress = `${streetAddress}, ${city}, ${state}, ${zipCode}`;
    streetAddress = '456 Elm St';
    const permanentAddress = `${streetAddress}, ${city}, ${state}, ${zipCode}`;

    await textBox.goTo();
    await textBox.selectElementsMenu();
    await textBox.selectTextBoxMenu();
    await textBox.fillInputsByValues(fullName, email, currentAddress, permanentAddress);
    await expect(textBox.fullName, 'Expected the entered full name').toHaveValue(fullName);
    await expect(textBox.email, 'Expected the entered email').toHaveValue(email);
    await expect(textBox.currentAddress, 'Expected the entered current address').toHaveValue(currentAddress);
    await expect(textBox.permanentAddress, 'Expected the entered permanent address').toHaveValue(permanentAddress);
    await textBox.submitTextBoxForm();
  });
});