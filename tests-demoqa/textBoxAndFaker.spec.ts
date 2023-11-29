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
    await textBox.submitTextBoxForm();
  });
});


   // await page.locator(("h5:has-text('Elements')")).click();
    // await page.locator("span:has-text('Text Box')").click();
    //await page.locator('#submit').click();

   // await page.locator('#userName').fill(fullName);
    // await page.locator('#userEmail').fill(email);
    // await page.locator('#currentAddress').fill(currentAddress);
    // await page.locator('#permanentAddress').fill(permanentAddress);

     
    // expect(await page.locator("#name").textContent()).toContain(fullName);
    // expect(await page.locator("#email").textContent()).toContain(email);
    // expect(await page.locator("p[id*='currentAddress']").textContent()).toContain(currentAddress);
    // expect(await page.locator("p[id*='permanentAddress']").textContent()).toContain(permanentAddress);