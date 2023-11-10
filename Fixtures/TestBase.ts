import { test as base } from '@playwright/test';

type TestData = {
    userName: string;
    userPass: string;
    productName: string;
    cvv: string;
    cardName: string;
    shortCountry: string;
    fullCountryName: string;
  };
  
  export const test = base.extend<TestData>({
    userName: 'nspprotest@gmail.com',
    userPass: 'Pl@ywright_test_m1',
    productName: 'iphone 13 pro',
    cvv: '186',
    cardName: 'My test Visa Card',
    shortCountry: 'Ukr',
    fullCountryName: 'Ukraine',
  });

  export { expect } from '@playwright/test';