import { expectSaga } from 'redux-saga-test-plan'
import test from 'tape'

import { delay } from 'redux-saga/effects'
import { errorInCallAsyncSaga } from '../src/sagas'

test('when run saga via sagaMiddleware errors are shown in logs', t => {
  return expectSaga(errorInCallAsyncSaga)
    .run()
    .then(() => t.end())
    .catch((/*error*/) => t.end(/*error*/))
})

test("when run generator manually errors aren't shown in logs", t => {
  const generator = errorInCallAsyncSaga()

  t.deepEqual(generator.next().value, delay(100))

  try {
    generator.next()
  } catch (e) {
    // just ignore errors to prevent tests from failing
  }

  t.end()
})