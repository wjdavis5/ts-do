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
const corsHeaders: any = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
}
const issuer: string = 'https://dev-4699488.okta.com/oauth2/default'
const expectedAudience: string = "api://default"

function parseJwt (token: string){
  var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function handleOptions(request: Request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  let headers = request.headers
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    let respHeaders = {
      ...corsHeaders,
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      'Access-Control-Allow-Headers': request.headers.get(
        'Access-Control-Request-Headers',
      ),
    }
    return new Response(null, {
      headers: respHeaders,
    })
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    })
  }
}

 function verifyAuth(accessToken: string, audience: string): boolean{
  let jwt = parseJwt(accessToken);
  console.log(jwt);
  var expDate = new Date(jwt.exp * 1000);
  var now = new Date();
  if(jwt.aud !== audience || jwt.iss !== issuer || now > expDate)
  {
    return false
  }
  return true;
}

async function handleRequest(request: Request, env: Env) {
  let path = new URL(request.url).pathname.slice(1)
  let response: Response
  let authHeader = request.headers.get('Authorization');
  console.log(authHeader);
  switch (request.method) {
    case 'OPTIONS': {
      response = handleOptions(request);
      break;
    }
    default: {
      if (!authHeader || !(verifyAuth(authHeader.split(' ')[1],expectedAudience))) {
        response = new Response('Unauthorized', {status: 401})
        break;
      }
      
      if (request.url.endsWith('/')) {
        response = new Response('Trailing slash is not allowed', {
          status: 400,
        })
        break;
      }

      if (!path || path === '' || path === '/') {
        response = new Response('Not Found', {
          status: 404,
          statusText: 'Not Found',
        })
      } else {
        let customer = path.split('/')[0]
        let id = env.FeatureToggleDo.idFromName(customer)
        let obj = env.FeatureToggleDo.get(id)
        let resp = await obj.fetch(request)
        let resText: string = await resp.text()
        response = new Response(`${resText}`, resp)
      }
      break;
    }
  }

  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  )

  return response
}
