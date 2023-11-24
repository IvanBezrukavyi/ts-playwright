import { expect, test as setup } from "@playwright/test";

const authFile = "./srs/auth/defaultStorageState.json";
const userEmail = "nspprotest@gmail.com";
const userPassword = "Pl@ywright_test_m1";

setup("authenticate default for client app", async ({ context, request }) => {
  const loginResponse = await request.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: {
        userEmail: userEmail,
        userPassword: userPassword,
      },
    }
  );
  const loginResponseJson = await loginResponse.json();
  const token = loginResponseJson.token;
  console.log(token);
  expect(token).not.toBeFalsy();
    await context.addCookies([
      {
        name: "JWToken",
        value: token,
        url: "https://rahulshettyacademy.com",
      },
    ])

  await context.storageState({ path: authFile });
});
