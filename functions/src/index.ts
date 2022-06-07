import * as functions from "firebase-functions";
import axios from "axios";

export const api = functions.https.onRequest(async (request, response) => {
  switch (request.method) {
    case "GET":
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      response.send(result.data);
      break;

    default:
      throw new Error("Invalid request method");
  }
});
