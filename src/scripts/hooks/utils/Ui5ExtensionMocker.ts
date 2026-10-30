import { URLPattern } from "urlpattern-polyfill";

export class Ui5ExtensionMocker {
  private static readonly payload: string = "File intentionally mocked by Qmate to improve performance";

  // WDIO v10 identifies mocks by URLPattern components. RegExp objects all
  // have undefined components and replace one another instead of coexisting.
  private static readonly patterns: Array<URLPattern> = [
    ...["pathname", "search"].map((component) => new URLPattern({ [component]: "*/xRayControls/*" })),
    ...["joule", "walkme"].flatMap((keyword) => ["hostname", "pathname", "search"].map((component) => new URLPattern({ [component]: `*${keyword}*` })))
  ];

  public static async mockRequests(): Promise<void> {
    await browser.mockClearAll();
    for (const pattern of this.patterns) {
      const mock = await browser.mock(pattern);
      mock.respond(this.payload, { statusCode: 404, fetchResponse: false });
    }
  }
}
