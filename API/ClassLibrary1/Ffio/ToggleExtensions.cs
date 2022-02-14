namespace Ffio;

public static class ToggleExtensions
{
    public static FeatureToggleRequest ForEnvironment(this FeatureToggleRequest featureToggleRequest, string environment)
    {
        featureToggleRequest.AppendPath(environment);
        return featureToggleRequest;
    }
    
    public static FeatureToggleRequest ForUser(this FeatureToggleRequest featureToggleRequest, string user)
    {
        featureToggleRequest.AppendPath(user);
        return featureToggleRequest;
    }
}