import { expect, test  } from '@playwright/test';
import {deleteAsync} from 'del';

test.describe('Teardown', () => {
  test('Remove defaultStorageState.json', async ({}) => {

    const deletedFiles = await deleteAsync(['./srs/auth/defaultStorageState.json']);
    
    expect(deletedFiles).toHaveLength(1);
  });
});
