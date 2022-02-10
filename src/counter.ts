export class CounterTs {
  state: DurableObjectState

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
  }

  // Handle HTTP requests from clients.
  async fetch(request: Request) {
    // Apply requested action.
    console.debug(JSON.stringify(request));
    let url = new URL(request.url);
    console.debug(JSON.stringify(url));
    let action = url.pathname.split('/')[2];
    // Durable Object storage is automatically cached in-memory, so reading the
    // same key every request is fast. (That said, you could also store the
    // value in a class member if you prefer.)
    let value: number = await this.state.storage?.get("value") || 0;
    switch (action) {
    case "increment":
      ++value;
      break;
    case "decrement":
      --value;
      break;
    case "/":
      // Just serve the current value. No storage calls needed!
      break;
    default:
      return new Response("Not found", {status: 404});
    }

    // We don't have to worry about a concurrent request having modified the
    // value in storage because "input gates" will automatically protect against
    // unwanted concurrency. So, read-modify-write is safe. For more details,
    // see: https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/
    await this.state.storage?.put("value", value);
      
    return new Response(value.toString());
  }
}

interface Env {}
