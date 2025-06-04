interface MockResponse {
  payload: string;
  params: {
    statusCode: number;
    fetchResponse: boolean;
  }
}

export class Ui5ExtensionMocker {
  private static readonly urlRegexps: RegExp[] = [
    /.*\/xRayControls\/.*/gm,
    /.*joule.*/gm,
    /.*walkme.*/gm
  ];

  private static readonly mockResponse: MockResponse = {
    payload: "File not found",
    params: {
      statusCode: 404,
      fetchResponse: false
    }
  };

  public static async mockRequests(): Promise<void> {
    for (const urlRegexp of this.urlRegexps) {
      const mock = await browser.mock(urlRegexp);
      mock.respond(this.mockResponse.payload, this.mockResponse.params);
    }
  }
}
