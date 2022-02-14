using System.Net;
using Newtonsoft.Json;

namespace Ffio;

public class FeatureToggleClient
{
    private readonly HttpClient _client;
    private readonly string _customer;
    
    public FeatureToggleClient(string customer)
    {
        _client = new HttpClient()
        {
            BaseAddress = new Uri("https://ts-do.wjd5.workers.dev/")
        };
        _customer = customer;
    }

    public FeatureToggleRequest ToggleRequest(string toggleName)
    {
        return new FeatureToggleRequest(_customer, toggleName, this);
    }

    public async Task<FeatureToggle?> GetToggle(FeatureToggleRequest featureToggleRequest)
    {
        var fullPath = String.Join('/', featureToggleRequest.Paths);
        var requestMsg = new HttpRequestMessage(HttpMethod.Get, fullPath);
        var response = await _client.SendAsync(requestMsg);
        var readAsStringAsync = await response.Content.ReadAsStringAsync();
        return response.StatusCode != HttpStatusCode.OK || readAsStringAsync == "Not found"
            ? null : JsonConvert.DeserializeObject<FeatureToggle>(readAsStringAsync);
    }
    
}