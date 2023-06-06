using System.Security.Authentication;
using GenericWebApi.Messaging.MQTT.Options;
using Microsoft.Extensions.Options;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Protocol;

namespace GenericWebApi.Messaging.MQTT.Logic;

internal sealed class WindTurbineDataPublisher : IHostedService, IDisposable
{
    private readonly WindTurbineMessageGenerator _generator;
    private readonly MqttOptions _options;
    
    private Timer _timer;
    public WindTurbineDataPublisher(IOptions<MqttOptions> options, WindTurbineMessageGenerator generator)
    {
        _generator = generator;
        _options = options.Value;
    }

    private async void PublishTurbineData(object state)
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

        var turbineData = await _generator.CreateTurbineMessages();

        foreach (var dataEntry in turbineData)
        {
            var applicationMessage = new MqttApplicationMessageBuilder()
                .WithTopic("wind-farm/turbine-data")
                .WithPayload(dataEntry)
                .WithQualityOfServiceLevel(MqttQualityOfServiceLevel.ExactlyOnce)
                .Build();
            
            await mqttClient.PublishAsync(applicationMessage, CancellationToken.None);
        }

        await mqttClient.DisconnectAsync();
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _timer = new Timer(PublishTurbineData, null, TimeSpan.Zero, TimeSpan.FromSeconds(_options.UpdateRateSeconds));
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _timer?.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer.Dispose();
    }
}