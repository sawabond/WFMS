namespace GenericWebApi.Messaging.MQTT.Options;

public sealed record MqttOptions
{
    public string TcpServer { get; init; }

    public int TcpPort { get; init; }

    public string Username { get; init; }

    public string Password { get; init; }

    public int UpdateRateSeconds { get; init; } = 30;
}