using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API.MiddleWare
{
    public class MiddlewareException
    {
        private readonly IHostEnvironment environment;
        private readonly  ILogger<MiddlewareException> logger;
        private readonly RequestDelegate next;

        public MiddlewareException(RequestDelegate next, ILogger<MiddlewareException> logger, IHostEnvironment environment)
        {
            this.logger = logger;
            this.next = next;
            this.environment = environment;
        }

        public async Task InvokeAsync (HttpContext ctx)
        {
            try {
                await next(ctx);
            }
            catch (Exception e) {
                logger.LogError(e, e.Message);
                ctx.Response.ContentType = "application/json";
                ctx.Response.StatusCode = 500;

                var resp = new ProblemDetails
                {
                    Title = e.Message,
                    Status = 500,
                    Detail = environment.IsDevelopment() ? e.StackTrace?.ToString() : null,
                };

                var opt = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var json = JsonSerializer.Serialize(resp, opt);

                await ctx.Response.WriteAsync(json);
            }
        }
    }
}