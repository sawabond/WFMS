using System.Security.Authentication;
using Microsoft.Extensions.Options;
using MQTT.Publisher.Options;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Protocol;

namespace MQTT.Publisher.Logic;

internal sealed class WindTurbineDataPublisher
{
    private readonly WindTurbineMessageGenerator _generator;
    private readonly MqttOptions _options;
    
    public WindTurbineDataPublisher(IOptions<MqttOptions> options, WindTurbineMessageGenerator generator)
    {
        _generator = generator;
        _options = options.Value;
    }

    public async Task PublishTurbineData()
    {
        var mqttFactory = new MqttFactory();
        using var mqttClient = mqttFactory.CreateMqttClient();
        
        var mqttClientOptions = new MqttClientOptionsBuilder()
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
            .Build();

        await mqttClient.ConnectAsync(mqttClientOptions, CancellationToken.None);

        var turbineData = _generator.CreateTurbineMessage();
        
        var applicationMessage = new MqttApplicationMessageBuilder()
            .WithTopic("wind-farm/turbine-data")
            .WithPayload(turbineData)
            .WithQualityOfServiceLevel(MqttQualityOfServiceLevel.ExactlyOnce)
            .Build();

        await mqttClient.PublishAsync(applicationMessage, CancellationToken.None);

        await mqttClient.DisconnectAsync();
    }
}