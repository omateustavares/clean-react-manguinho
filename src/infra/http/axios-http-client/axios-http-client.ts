import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
} from "@/data/protocols/http";
import axios from "axios";

// Design partner: Adapter: é um padrão de projeto estrutural que permite objetos com interfaces incompatíveis colaborarem entre si.
export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(params.url, params.body);
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
