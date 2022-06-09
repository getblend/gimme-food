import * as functions from "firebase-functions";

type Handler = (
  request: functions.https.Request,
  response: functions.Response
) => Promise<void> | void;

/**
 * A helper to register the cloud function and protect it from misuse
 */
export const guard = (
  method: string,
  handler: Handler
): functions.HttpsFunction =>
  functions.https.onRequest((request, response) => {
    // Validate HTTP method
    if (request.method !== method) {
      response.status(400).send("Invalid HTTP Method");
      return;
    }

    // Only check for Authentication if running outside the emulator
    if (!process.env.FUNCTIONS_EMULATOR) {
      // Ensure https
      if (!request.secure) {
        response.sendStatus(404);
        return;
      }

      // Check for authorization header
      if (!request.headers.authorization) {
        response.status(400).send("API Key was not provided");
        return;
      }

      // Check for BLEND_API_KEY
      if (!process.env.BLEND_API_KEY) {
        response.status(500).send("BLEND_API_KEY was not found");
        return;
      }

      // Check for the right format in the header
      if (
        !request.headers.authorization
          .toLowerCase()
          .includes(`Client-ID ${process.env.BLEND_API_KEY}`.toLowerCase())
      ) {
        response
          .status(401)
          .send(
            "Invalid API Key. Expected 'Authorization': 'Client-ID <BLEND_API_KEY>' header."
          );
        return;
      }
    }

    return handler(request, response);
  });
