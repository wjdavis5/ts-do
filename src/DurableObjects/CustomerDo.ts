export class CustomerDo {
  state: DurableObjectState;
  env: Env;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
  }

  // Handle HTTP requests from clients.
  async fetch(request: Request) {
    let value: number = await this.state.storage?.get("value") || 0;
    await this.state.storage?.put("value", value);
      
    return new Response(value.toString());
  }
}

interface Env {}
