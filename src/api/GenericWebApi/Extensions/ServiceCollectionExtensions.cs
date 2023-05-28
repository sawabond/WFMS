using AutoFilterer.Swagger;
using BusinessLogic;
using BusinessLogic.Abstractions;
using BusinessLogic.Extensions;
using BusinessLogic.HostedServices;
using BusinessLogic.Models;
using BusinessLogic.Options;
using BusinessLogic.Services;
using BusinessLogic.Services.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

namespace GenericWebApi.Extensions;

public static class ServiceCollectionExtensions
{
    public static AuthenticationBuilder AddBearerAuthentication(this IServiceCollection services)
    {
        var jwtOptions = services.BuildServiceProvider().GetRequiredService<IOptions<JwtOptions>>().Value;

        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(jwtOptions.Key.ToByteArray()),
            ValidateIssuer = false,
            ValidateAudience = false,
            RequireExpirationTime = false,
            ValidateLifetime = true
        };

        services.AddSingleton(tokenValidationParameters);

        return services
            .AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = tokenValidationParameters;
            });
    }

    public static IServiceCollection AddBusinessLogicServices(this IServiceCollection services)
    {
        services.AddInjectableHostedService<WindSimulator>();
        
        return services.Scan(selector => selector
                .FromAssemblies(typeof(AssemblyReference).Assembly)
                .AddClasses(filter => 
                {
                    filter.NotInNamespaceOf<ModelsNamespaceReference>();
                    filter.NotInNamespaceOf<MailSettingsOptions>();
                    filter.NotInNamespaceOf<WindSimulator>();
                }, publicOnly: false)
                .AsImplementedInterfaces()
                .WithScopedLifetime());
    }
    
    private static IServiceCollection AddInjectableHostedService<T>(this IServiceCollection services)
        where T : class, IHostedService=>
        services.AddSingleton<T>()
            .AddHostedService<T>(provider => provider.GetService<T>());

    public static IServiceCollection AddSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "GenericWebApi", Version = "v1" });
            c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
            {
                Description = "Authorization using Bearer scheme 'Bearer <token>'",
                In = ParameterLocation.Header,
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey
            });
            c.OperationFilter<SecurityRequirementsOperationFilter>();
            c.UseAutoFiltererParameters();
        });

        return services;
    }
}
