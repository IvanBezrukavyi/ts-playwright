import { test, expect } from "playwright/test";
import { faker } from "@faker-js/faker/locale/en_US";
import TextBoxPage from "../srs/main/demoApp/TextBoxPage";

test.describe("@Demoqa Text Box Tests", () => {
  let textBox: TextBoxPage;
  let fullName: string;
  let email: string;
  let streetAddress: string;
  let city: string;
  let state: string;
  let zipCode: string;
  let currentAddress: string;
  let permanentAddress: string;

  test.beforeEach(async ({ page }) => {
    textBox = new TextBoxPage(page);

    fullName = faker.person.fullName();
    email = faker.internet.email({ provider: "demoqa.com" });

    streetAddress = faker.location.streetAddress();
    city = faker.location.city();
    state = faker.location.state();
    zipCode = faker.location.zipCode();

    currentAddress = `${streetAddress}, ${city}, ${state}, ${zipCode}`;
    streetAddress = "456 Elm St";
    permanentAddress = `${streetAddress}, ${city}, ${state}, ${zipCode}`;

    await textBox.goTo();
    await textBox.selectElementsMenu();
    await textBox.selectTextBoxMenu();
  });

  test("TC 2: E2E. Enter and remove data from input text fields and via keys and shortcuts and cycle", async () => {
    await test.step("Step 1. Fill inputs by valid data", async () => {
      await textBox.fillInputsByShortcuts(
        fullName,
        email,
        currentAddress,
        permanentAddress
      );

      await expect(textBox.fullName, "Expected the entered full name").toHaveValue(fullName);
      await expect(textBox.email, "Expected the entered email").toHaveValue(email);
      await expect(textBox.currentAddress, "Expected the entered current address").toHaveValue(currentAddress);
      await expect(textBox.permanentAddress, "Expected the entered permanent address").toHaveValue(permanentAddress);
    });

    await test.step("Step 2. Click Submit button and Verify submitted data", async () => {
      await textBox.submitTextBoxFormByEnter();

      const submittedData = await textBox.getSubmittedData();

      await expect(submittedData.expFullName, "Expected the submitted full name").toContain(fullName);
      await expect(submittedData.expEmail, "Expected the submitted email").toContain(email);
      await expect(submittedData.expCurrentAddress, "Expected the submitted current address").toContain(currentAddress);
      await expect(submittedData.expPermanentAddress, "Expected the submitted permanent address").toContain(permanentAddress);
    });

    await test.step("Step 3. Remove data from Full Name input", async () => {
      await textBox.removeInputContent(textBox.fullName);
      await textBox.removeInputContent(textBox.email);
      await textBox.removeInputContent(textBox.currentAddress);
      await textBox.removeInputContent(textBox.permanentAddress);
    });

    await test.step("Step 4. Click Submit button and Verify absence data after removing it", async () => {
      await textBox.submitTextBoxFormByEnter();
      const removedInputContent = await textBox.getRemovedInputContent();
      expect(removedInputContent.fullName, 'Expected empty Full Name input field').toBe('');
      expect(removedInputContent.email, 'Expected empty Email input field').toBe('');
      expect(removedInputContent.currentAddress, 'Expected empty Current Address input field').toBe('');
      expect(removedInputContent.permanentAddress, 'Expected empty Permanent Address input field').toBe('');
    });
  });

  test("TC 3: E2E. Enter and remove data from input text fields and via keys and shortcuts", async () => {
    await test.step("Step 1. Fill inputs by valid data", async () => {
      await textBox.fillInputsByShortcuts(
        fullName,
        email,
        currentAddress,
        permanentAddress
      );

      await expect(textBox.fullName, "Expected the entered full name").toHaveValue(fullName);
      await expect(textBox.email, "Expected the entered email").toHaveValue(email);
      await expect(textBox.currentAddress, "Expected the entered current address").toHaveValue(currentAddress);
      await expect(textBox.permanentAddress, "Expected the entered permanent address").toHaveValue(permanentAddress);
    });

    await test.step("Step 2. Click Submit button", async () => {
      await textBox.submitTextBoxFormByEnter();

      const submittedData = await textBox.getSubmittedData();

      await expect(submittedData.expFullName, "Expected the submitted full name").toContain(fullName);
      await expect(submittedData.expEmail, "Expected the submitted email").toContain(email);
      await expect(submittedData.expCurrentAddress, "Expected the submitted current address").toContain(currentAddress);
      await expect(submittedData.expPermanentAddress, "Expected the submitted permanent address").toContain(permanentAddress);
    });

    await test.step("Step 3. Select all data in row and remove it", async () => {
      await textBox.removeContentViaShortcuts(textBox.fullName);
      await textBox.removeContentViaShortcuts(textBox.email);
      await textBox.removeContentViaShortcuts(textBox.currentAddress);
      await textBox.removeContentViaShortcuts(textBox.permanentAddress);
    });

    await test.step("Step 4. Click Submit button and Verify absence data after removing it", async () => {
      await textBox.submitTextBoxFormByEnter();
      const removedInputContent = await textBox.getRemovedInputContent();
      expect(removedInputContent.fullName, 'Expected empty Full Name input field').toBe('');
      expect(removedInputContent.email, 'Expected empty Email input field').toBe('');
      expect(removedInputContent.currentAddress, 'Expected empty Current Address input field').toBe('');
      expect(removedInputContent.permanentAddress, 'Expected empty Permanent Address input field').toBe('');
    });
  });
});
