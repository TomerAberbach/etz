/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import kleur from 'kleur'
import figures from 'figures'

const levels = [
  [0, `debug`, kleur.cyan, figures.star],
  [1, `info`, kleur.blue, figures.info],
  [2, `warn`, kleur.yellow, figures.warning],
  [3, `error`, kleur.red, figures.cross],
]

const levelsByName = {}
const etz = {}

levels.forEach(level => {
  const [index, name, color, symbol] = level
  const prefix = color(`${symbol} ${name.toUpperCase()}`)

  levelsByName[name] = level
  etz[name] = message => {
    const { env } = process

    if (`NO_ETZ` in env) {
      return
    }

    let { ETZ } = env
    ETZ = String(ETZ).toLowerCase()
    const level =
      levelsByName[ETZ] || (ETZ && levels[Number(ETZ)]) || levelsByName.info

    if (index >= level[0]) {
      console.log(`${prefix} ${message}`)
    }
  }
})

export default etz
