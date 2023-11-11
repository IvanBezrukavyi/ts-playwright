import { test as base, expect as baseExpect } from '@playwright/test';

export type TestDataType = {
  userName: string;
  userPass: string;
  productName: string;
  cvv: string;
  cardName: string;
  shortCountry: string;
  fullCountryName: string;
};

export const dataOrderSet = base.extend<TestDataType>({
  userName: 'nspprotest@gmail.com',
  userPass: 'Pl@ywright_test_m1',
  productName: 'iphone 13 pro',
  cvv: '186',
  cardName: 'My test Visa Card',
  shortCountry: 'Ukr',
  fullCountryName: 'Ukraine',
});

export const expect = baseExpect; // Re-exporting expect for convenience
