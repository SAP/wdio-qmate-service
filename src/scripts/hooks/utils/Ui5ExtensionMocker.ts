interface MockResponse {
  requestUrlPattern: string;
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
      requestUrlPattern: "**/xRayControls/**",
      payload: this.payload,
      params: {
        statusCode: 404,
        fetchResponse: false
      }
    },
    {
      requestUrlPattern: "**joule**",
      payload: this.payload,
      params: {
        statusCode: 404,
        fetchResponse: false
      }
    },
    {
      requestUrlPattern: "**walkme**",
      payload: this.payload,
      params: {
        statusCode: 404,
        fetchResponse: false
      }
    }
  ];

  public static async mockRequests(): Promise<void> {
    for (const response of this.mockResponses) {
      const mock = await browser.mock(response.requestUrlPattern);
      mock.respond(response.payload, response.params);
    }
  }
}
