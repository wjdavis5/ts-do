// In order for the workers runtime to find the class that implements
// our Durable Object namespace, we must export it from the root module.
export { FeatureToggleDo } from './DurableObjects/FeatureToggleDo';
export { CustomerDo } from './DurableObjects/CustomerDo';

export default {
  async fetch(request: Request, env: Env) {
    try {
      return await handleRequest(request, env)
    } catch (e) {
      return new Response(`${e}`)
    }
  },
}

async function handleRequest(request: Request, env: Env) {
  let toggleName = (new URL(request.url)).pathname;
  if(!toggleName || toggleName === '' || toggleName === '/'){
    return new Response(null,{
      "status": 404
    });
  }
  let id = env.FeatureToggleDo.idFromName(toggleName)
  let obj = env.FeatureToggleDo.get(id)
  let resp = await obj.fetch(request)
  let resText: string = await resp.text();

  return new Response(`${resText}`);
}

interface Env {
  CustomerDo: DurableObjectNamespace,
  FeatureToggleDo: DurableObjectNamespace
}
