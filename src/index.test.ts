import { test } from '@fast-check/vitest'
import { afterEach, expect } from 'vitest'
import etz from './index.js'

const { env } = process
const { log } = console

afterEach(() => {
  process.env = env
  console.log = log
})

test.each([
  [`emptyEnv`, { env: {}, expectedMessages: [`INFO`, `WARN`, `ERROR`] }],
  [`noEtzString`, { env: { NO_ETZ: `` }, expectedMessages: [] }],
  [`noEtzUndefined`, { env: { NO_ETZ: undefined }, expectedMessages: [] }],
  [`noEtzBoolean`, { env: { NO_ETZ: `false` }, expectedMessages: [] }],
  [
    `emptyEtz`,
    { env: { ETZ: `` }, expectedMessages: [`INFO`, `WARN`, `ERROR`] },
  ],
  [
    `randomEtz`,
    {
      env: { ETZ: `sdfsdfsd` },
      expectedMessages: [`INFO`, `WARN`, `ERROR`],
    },
  ],
  [
    `lowEtz`,
    {
      env: { ETZ: `-1` },
      expectedMessages: [`INFO`, `WARN`, `ERROR`],
    },
  ],
  [
    `highEtz`,
    {
      env: { ETZ: `5` },
      expectedMessages: [`INFO`, `WARN`, `ERROR`],
    },
  ],
  [
    `debugEtz`,
    {
      env: { ETZ: `dEbUg` },
      expectedMessages: [`DEBUG`, `INFO`, `WARN`, `ERROR`],
    },
  ],
  [
    `debugIndexEtz`,
    {
      env: { ETZ: `0` },
      expectedMessages: [`DEBUG`, `INFO`, `WARN`, `ERROR`],
    },
  ],
  [
    `infoEtz`,
    {
      env: { ETZ: `InFo` },
      expectedMessages: [`INFO`, `WARN`, `ERROR`],
    },
  ],
  [
    `infoIndexEtz`,
    {
      env: { ETZ: `1` },
      expectedMessages: [`INFO`, `WARN`, `ERROR`],
    },
  ],
  [`warnEtz`, { env: { ETZ: `WaRN` }, expectedMessages: [`WARN`, `ERROR`] }],
  [`warnIndexEtz`, { env: { ETZ: `2` }, expectedMessages: [`WARN`, `ERROR`] }],
  [`errorEtz`, { env: { ETZ: `eRror` }, expectedMessages: [`ERROR`] }],
  [`errorIndexEtz`, { env: { ETZ: `3` }, expectedMessages: [`ERROR`] }],
  [`noEtzAndEtz`, { env: { NO_ETZ: `true`, ETZ: `0` }, expectedMessages: [] }],
])(`etz %s`, (_, { env, expectedMessages }) => {
  process.env = env
  const messages: string[] = []
  console.log = (message: string) => void messages.push(message)

  etz.debug(`Hello World!`)
  etz.info(`Hello World!`)
  etz.warn(`Hello World!`)
  etz.error(`Hello World!`)

  expect(messages).toHaveLength(expectedMessages.length)
  for (const [index, expectedMessage] of expectedMessages.entries()) {
    expect(messages[index]).toInclude(expectedMessage)
    expect(messages[index]).toInclude(`Hello World!`)
  }
})
