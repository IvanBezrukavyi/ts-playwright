import { test  } from '@playwright/test';
import {deleteAsync} from 'del';

const authFile = "./srs/auth/defaultStorageState.json";

test.describe('Teardown', () => {
  // eslint-disable-next-line playwright/expect-expect
  test('Remove ${authFile} after running client app tests', async ({}) => {
    try {
       await deleteAsync([authFile]);
       console.log(`Deleted ${authFile} successfully`)
    } catch (error) {
      console.log(`Error deleting ${authFile}:${error.message}`);
    }

  });
});
