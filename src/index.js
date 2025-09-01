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

for (const level of levels) {
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
}

export default etz
