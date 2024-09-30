export class SwrError extends Error {
  public readonly response: Response;
  public readonly responseBody: unknown;

  constructor(
    message: string,
    {
      response,
      responseBody,
    }: {
      response: Response;
      responseBody: unknown;
    },
  ) {
    super(message);

    this.name = "swrError";
    this.response = response;
    this.responseBody = responseBody;

    // Set the prototype explicitly
    Object.setPrototypeOf(this, SwrError.prototype);
  }
}

export const createSwrError = (response: Response, responseBody: unknown) => {
  return new SwrError(`Status: ${response.status}`, {
    response,
    responseBody,
  });
};
