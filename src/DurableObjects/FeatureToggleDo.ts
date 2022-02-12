export class FeatureToggleDo {
  state: DurableObjectState
  env: Env
  constructor(state: DurableObjectState, env: Env) {
    this.state = state
    this.env = env
  }

  async fetch(request: Request) {
    let url = new URL(request.url);
    let togglePath = url.pathname.slice(1);
    let paths = togglePath.split('/');
    let cutsomerId = `${paths[0]}`;
    console.debug("customer:", cutsomerId);

    let toggle: boolean;
    if (request.method === 'POST') {
      if(paths.length == 1) return new Response("No toggle specified", {status: 400});
      console.debug("Saving feature toggle:", togglePath);
      toggle = (await this.state.storage?.get(togglePath)) ?? false;
      
      await this.state.storage?.put(togglePath, !toggle)
    }
    if (request.method === 'GET' && paths.length === 1) {
      console.debug("Getting all keys for customer", cutsomerId);
      console.debug(this);
      const allKeys = await this.state.storage?.list();
      console.debug("All Keys for this obj:", allKeys);
      console.debug("Getting keys by prefix: ", cutsomerId);
      const allCutsomerKeys = await this.state.storage?.list({
        prefix: cutsomerId,
      })
      const allToggles = new Array<FeatureToggle>();
      allCutsomerKeys?.forEach(function(value, key){
        allToggles.push({
          "name": key,
          "value": value as boolean
        });
      })
      console.debug("All keys with prefix:", allCutsomerKeys);
      console.debug(JSON.stringify(allCutsomerKeys));
      return new Response(JSON.stringify(allToggles));
    }

    let toggleValue: boolean | undefined = await this.state.storage?.get(togglePath)
    if (toggleValue === undefined) return new Response('Not found', { status: 404 })

    // We don't have to worry about a concurrent request having modified the
    // value in storage because "input gates" will automatically protect against
    // unwanted concurrency. So, read-modify-write is safe. For more details,
    // see: https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/

    return new Response(JSON.stringify({"name": togglePath, "value": toggleValue}));
  }
}

interface Env {}
