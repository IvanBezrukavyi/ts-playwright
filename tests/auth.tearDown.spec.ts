import { test } from '@playwright/test'
import { deleteAsync } from 'del'
import { logger } from '../srs/logger/winston.config'

const authFile = process.env.AUTH_FILE || './srs/auth/defaultStorageState.json'

test.describe('Teardown', () => {
    // eslint-disable-next-line playwright/expect-expect
    test('Remove ${authFile} after running client app tests', async ({}) => {
        try {
            await deleteAsync([authFile])
            logger.info(`Deleted ${authFile} successfully`)
        } catch (error) {
            logger.info(`Error deleting ${authFile}:${error.message}`)
        }
    })
})
