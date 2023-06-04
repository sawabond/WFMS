using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MQTT.Publisher.Logic;
using MQTT.Publisher.Options;

IConfiguration configuration = new ConfigurationBuilder()
    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddUserSecrets<Program>()
    .Build();

var serviceCollection = new ServiceCollection()
    .AddSingleton(configuration)
    .AddSingleton<WindTurbineDataPublisher>()
    .AddSingleton<WindTurbineMessageGenerator>();

serviceCollection.AddOptions<MqttOptions>().BindConfiguration("MQTT");

var provider = serviceCollection.BuildServiceProvider();

var pub = provider.GetRequiredService<WindTurbineDataPublisher>();

while (true)
{
    await pub.PublishTurbineData();
    Console.WriteLine("Published turbine data" + DateTimeOffset.Now);
    Thread.Sleep(30_000);
}