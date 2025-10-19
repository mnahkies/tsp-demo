import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Http;
using TypeSpec.Rest;
@service(#{title: "My API"})
@server("https://api.myapi.com", "Production server")
namespace MyAPI;

model HealthCheckResponse {
  version: string;
  uptime: float64;
}

@route("/hello")
interface HelloWorld {
  @get
  @route("/")
  getHello(): {
    @statusCode statusCode: 200;
    @body body: {
      message: string;
    };
  };
}

@route("/health")
interface Health {
  @get
  @route("/")
  getHealth(): {
    @statusCode statusCode: 200;
    @body body: HealthCheckResponse;
  };
}