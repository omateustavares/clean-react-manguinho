import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { InvalidCredentialsError } from "@/domain/Errors/invalid-credentials-error";
import { AuthenticationParams } from "@/domain/usecases/authentication";
import { HttpPostClient } from "../../protocols/http/http-post-client";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError();
      default:
        return Promise.resolve();
    }
  }
}
