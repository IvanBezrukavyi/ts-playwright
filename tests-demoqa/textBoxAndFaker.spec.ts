import { test, expect } from "playwright/test";
import { faker } from "@faker-js/faker/locale/en";

test.describe("Randomize test data by fake data", () => {
  test("TC: Fill out input text fields by data from faker lib", async ({
    page,
  }) => {
    const fullName = faker.person.fullName();
    const email = faker.internet.email({provider: 'example.ibez.com'});
    const currentAddress = faker.location.secondaryAddress();
    const permanentAddress = faker.location.secondaryAddress();

    await page.goto("/");
    await page.click("//h5[normalize-space()='Elements']");
  });
});
