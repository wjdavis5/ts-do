import { Env } from '../Models/Env'

export class FeatureToggleDo {
  state: DurableObjectState
  env: Env
  constructor(state: DurableObjectState, env: Env) {
    this.state = state
    this.env = env
  }

  async fetch(request: Request) {
    let url = new URL(request.url)
    let togglePath = url.pathname.slice(1)
    let paths = togglePath.split('/')
    let cutsomerId = `${paths[0]}`
    let toggle: boolean

    if (request.method === 'POST') {
      if (paths.length == 1)
        return new Response('No toggle specified', { status: 400 })
      console.debug('Saving feature toggle:', togglePath)
      toggle = (await this.state.storage?.get(togglePath)) ?? false

      await this.state.storage?.put(togglePath, !toggle)
    }

    if (request.method === 'GET' && paths.length === 1) {
      const allCutsomerKeys = await this.state.storage?.list({
        prefix: cutsomerId,
      })
      const allToggles = new Array<FeatureToggle>()
      allCutsomerKeys?.forEach(function(value, key) {
        allToggles.push({
          name: key,
          value: value as boolean,
        })
      })

      return new Response(JSON.stringify(allToggles))
    }

    let toggleValue: boolean | undefined = await this.state.storage?.get(
      togglePath,
    )

    if (toggleValue === undefined)
      return new Response('Not found', { status: 404 })

    return new Response(
      JSON.stringify({ name: togglePath, value: toggleValue }),
    )
  }
}
