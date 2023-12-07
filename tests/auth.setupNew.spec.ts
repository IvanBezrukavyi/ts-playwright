import { expect, test as setup } from "@playwright/test";

const authLoginEndPoint =
  process.env.AUTH_LOGIN_END_POINT ||
  "https://rahulshettyacademy.com/api/ecom/auth/login";
const authFile = process.env.AUTH_FILE || "./srs/auth/defaultStorageState.json";
const clientAppUrl =
  process.env.CLIENT_APP_URL || "https://rahulshettyacademy.com";
const userEmail = process.env.USER_EMAIL || "nspprotest@gmail.com";
const userPassword = process.env.USER_PASSWORD || "Pl@ywright_test_m1";

setup("default authentication for client app", async ({ context, request }) => {
  const loginResponse = await request.post(authLoginEndPoint, {
    data: {
      userEmail: userEmail,
      userPassword: userPassword,
    },
  });

  if (!loginResponse.ok) {
    throw new Error(`Login failed with status code: ${loginResponse.status}`);
  }

  const loginResponseJson = await loginResponse.json();
  const token = loginResponseJson.token;
  expect(token).not.toBeFalsy();

  await context.addCookies([
    {
      name: "JWToken",
      value: token,
      url: clientAppUrl,
    },
  ]);

  await context.storageState({ path: authFile });
});
