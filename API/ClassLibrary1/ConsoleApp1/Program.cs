using Ffio;

public class Program
{
    public static async Task Main(string[] args)
    {
        var toggleClient = new FeatureToggleClient("customer1");
        var toggle = await toggleClient.ToggleRequest("feature10")
            .ForEnvironment("test")
            .ForUser("will")
            .GetToggle();
        Console.WriteLine($"ToggleName: {toggle?.name} - Value: {toggle?.value}");
    }
}