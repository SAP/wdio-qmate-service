interface MockResponse {
  requestUrlRegexp: RegExp;
  payload: string;
  params: {
    statusCode: number;
    fetchResponse: boolean;
  }
}

export class Ui5ExtensionMocker {
  private static readonly payload: string = "File intentionally mocked by Qmate to improve performance";

  private static readonly mockResponses: Array<MockResponse> = [
    {
      requestUrlRegexp: /.*\/xRayControls\/.*/gm,
      payload: this.payload,
      params: {
        statusCode: 404,
        fetchResponse: false
      }
    },
    {
      requestUrlRegexp: /.*joule.*/gm,
      payload: this.payload,
      params: {
        statusCode: 404,
        fetchResponse: false
      }
    },
    {
      requestUrlRegexp: /.*walkme.*/gm,
      payload: this.payload,
      params: {
        statusCode: 404,
        fetchResponse: false
      }
    }
  ];

  public static async mockRequests(): Promise<void> {
    for (const response of this.mockResponses) {
      const mock = await browser.mock(response.requestUrlRegexp);
      mock.respond(response.payload, response.params);
    }
  }
}
