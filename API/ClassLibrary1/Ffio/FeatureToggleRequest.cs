namespace Ffio;

public class FeatureToggleRequest
{
    public List<string> Paths { get; }
    private readonly FeatureToggleClient _client;
    public FeatureToggleRequest(string customer, string toggleName, FeatureToggleClient client)
    {
        Paths = new List<string>() {customer, toggleName};
        _client = client;
    }
    
    public async Task<FeatureToggle> GetToggle()
    {
        return await _client.GetToggle(this);
    }
    public void AppendPath(string path)
    {
        Paths.Add(path);
    }
}