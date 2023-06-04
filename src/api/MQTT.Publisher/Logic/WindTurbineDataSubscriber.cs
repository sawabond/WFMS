using System.Security.Authentication;
using Microsoft.Extensions.Options;
using MQTT.Publisher.Options;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Extensions.ManagedClient;
using MQTTnet.Packets;

namespace MQTT.Publisher.Logic;

public abstract class WindTurbineDataSubscriber
{
    private readonly MqttOptions _options;
    private IManagedMqttClient _mqttClient;
    
    private List<MqttTopicFilter> _mqttTopicFilters = new()
    {
        new() { Topic = "wind-farm/turbine-data" }
    };

    public WindTurbineDataSubscriber(IOptions<MqttOptions> options)
    {
        _options = options.Value;
    }
    
    protected async Task SubscribeAsync()
    {
        var options = new ManagedMqttClientOptionsBuilder()
            .WithAutoReconnectDelay(TimeSpan.FromSeconds(5))
            .WithClientOptions(new MqttClientOptionsBuilder()
                .WithTcpServer(_options.TcpServer, _options.TcpPort)
                .WithCredentials(_options.Username, _options.Password)
                .WithTls(x =>
                    {
                        x.UseTls = true;
                        x.SslProtocol = SslProtocols.Tls12;
                        x.AllowUntrustedCertificates = true;
                        x.IgnoreCertificateChainErrors = true;
                        x.IgnoreCertificateRevocationErrors = true;
                    })
                .Build())
            .Build();

        _mqttClient = new MqttFactory().CreateManagedMqttClient();
        _mqttClient.ApplicationMessageReceivedAsync += HandleReceivedMessage;

        await _mqttClient.StartAsync(options);
        
        await _mqttClient.SubscribeAsync(_mqttTopicFilters);
    }

    protected async Task UnsubscribeAsync()
    {
        await _mqttClient.UnsubscribeAsync(_mqttTopicFilters.Select(x => x.Topic).ToList());
    }

    protected virtual Task HandleReceivedMessage(MqttApplicationMessageReceivedEventArgs eventArgs)
    {
        var message = eventArgs.ApplicationMessage.ConvertPayloadToString();
        Console.WriteLine($"Received message: {message}");

        return Task.CompletedTask;
    }
}