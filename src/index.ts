// In order for the workers runtime to find the class that implements

import { Env } from './Models/Env'

// our Durable Object namespace, we must export it from the root module.
export { FeatureToggleDo } from './DurableObjects/FeatureToggleDo'
export { CustomerDo } from './DurableObjects/CustomerDo'

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
  let path = new URL(request.url).pathname.slice(1)
  if (request.url.endsWith('/'))
    return new Response('Trailing slash is not allowed', { status: 400 })
  console.debug('url:', request.url)
  console.debug('path:', path)
  if (!path || path === '' || path === '/') {
    return new Response(null, {
      status: 404,
    })
  }
  let customer = path.split('/')[0]
  console.debug('customer:', customer)
  let id = env.FeatureToggleDo.idFromName(customer)
  console.debug('do id:', id)
  let obj = env.FeatureToggleDo.get(id)
  console.debug('do obj:', obj)
  let resp = await obj.fetch(request)
  let resText: string = await resp.text()

  return new Response(`${resText}`)
}
