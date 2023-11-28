import { test, expect } from "playwright/test";
import { faker } from "@faker-js/faker/locale/en_US";

test.describe("@Demoqa Text Box Tests", () => {
  test("TC: Fill out input text fields by data from faker lib", async ({
    page,
  }) => {
    const fullName = faker.person.fullName();
    const email = faker.internet.email({provider: 'demoqa.com'});

    let streetAddress = faker.location.streetAddress();
    let city = faker.location.city();
    let state = faker.location.state();
    let zipCode = faker.location.zipCode();
    
    const currentAddress = `${streetAddress}, ${city}, ${state}, ${zipCode}`;
    streetAddress = '456 Elm St';
    const permanentAddress = `${streetAddress}, ${city}, ${state}, ${zipCode}`;
   
    await page.goto("/");
    await page.click("//h5[normalize-space()='Elements']");
    await page.locator('.element-group').first().click();
    await page.locator("span:has-text('Text Box')").click();
    await page.locator('#userName').fill(fullName);
    await page.locator('#userEmail').fill(email);
    await page.locator('#currentAddress').fill(currentAddress);
    await page.locator('#permanentAddress').fill(permanentAddress);
    await page.locator('#submit').click();
    expect(await page.locator("(//p[@id='name])[1]")).toHaveText(fullName);
    


    

    

  });
});
