import { test, expect } from "playwright/test";
import { faker } from "@faker-js/faker/locale/en_US";
import TextBoxPage from "../srs/main/demoApp/TextBoxPage";

test.describe("@Demoqa Text Box Tests", () => {
  test("TC 1: Fill out input text fields by data from faker lib", async ({
    page,
  }) => {
    const textBox = new TextBoxPage(page);

    const fullName = faker.person.fullName();
    const email = faker.internet.email({provider: 'demoqa.com'});

    let streetAddress = faker.location.streetAddress();
    const city = faker.location.city();
    const state = faker.location.state();
    const zipCode = faker.location.zipCode();
    
    const currentAddress = `${streetAddress}, ${city}, ${state}, ${zipCode}`;
    streetAddress = '456 Elm St';
    const permanentAddress = `${streetAddress}, ${city}, ${state}, ${zipCode}`;
    await test.step('Step 1. Navigate to application', async() => {
      await textBox.goTo();
    });
    await test.step('Step 2. Click on Elements menu',async () => {
      await textBox.selectElementsMenu();
    });
    await test.step('Step 3. Click on Text Box menu',async () => {
      await textBox.selectTextBoxMenu();
    });
    await test.step('Step 4. Fill inputs by valid data',async () => {
      await textBox.fillInputsByValues(fullName, email, currentAddress, permanentAddress);

      await expect(textBox.fullName, 'Expected the entered full name').toHaveValue(fullName);
      await expect(textBox.email, 'Expected the entered email').toHaveValue(email);
      await expect(textBox.currentAddress, 'Expected the entered current address').toHaveValue(currentAddress);
      await expect(textBox.permanentAddress, 'Expected the entered permanent address').toHaveValue(permanentAddress);
    });
    await test.step('Step 5. Click Submit button',async () => {
      await textBox.submitTextBoxForm();

      const submittedData = await textBox.getSubmittedData();
  
      await expect(submittedData.expFullName, 'Expected the submitted full name').toContain(fullName);
      await expect(submittedData.expEmail, 'Expected the submitted email').toContain(email);
      await expect(submittedData.expCurrentAddress, 'Expected the submitted current address').toContain(currentAddress);
      await expect(submittedData.expPermanentAddress, "Expected the submitted permanent address").toContain(permanentAddress);
    });
  });
});