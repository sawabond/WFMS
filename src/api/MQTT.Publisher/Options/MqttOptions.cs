namespace MQTT.Publisher.Options;

public sealed record MqttOptions
{
    public string TcpServer { get; init; }

    public int TcpPort { get; init; }

    public string Username { get; init; }

    public string Password { get; init; }
}