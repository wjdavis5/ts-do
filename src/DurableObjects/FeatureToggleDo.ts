export class FeatureToggleDo {
  state: DurableObjectState
  env: Env
  constructor(state: DurableObjectState, env: Env) {
    this.state = state
    this.env = env
  }

  // Handle HTTP requests from clients.
  async fetch(request: Request) {
    // Apply requested action.
    let url = new URL(request.url);
    let togglePath = url.pathname;
    let paths = togglePath.split('/');
    let cutsomerId = `/${paths[1]}`;
    console.debug(cutsomerId);

    let toggle: FeatureToggle | undefined = undefined
    if (request.method === 'POST') {
      toggle = (await this.state.storage?.get(togglePath)) ?? { value: false }
      toggle.value = !toggle.value
      await this.state.storage?.put(togglePath, toggle)
    }
    if (request.method === 'GET' && paths.length === 2) {
      const allKeys = await this.state.storage?.list();
      console.debug(JSON.stringify(allKeys));
      const allCutsomerKeys = await this.state.storage?.list({
        prefix: cutsomerId,
      })
      return new Response(JSON.stringify(allCutsomerKeys), { status: 200 })
    }

    toggle = await this.state.storage?.get(togglePath)
    if (toggle === undefined) return new Response('Not found', { status: 404 })

    // We don't have to worry about a concurrent request having modified the
    // value in storage because "input gates" will automatically protect against
    // unwanted concurrency. So, read-modify-write is safe. For more details,
    // see: https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/

    return new Response(JSON.stringify(toggle))
  }
}

interface Env {}
