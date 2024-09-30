/* eslint-disable no-console */
import { exec } from "child_process";

function runCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        console.error("Error:", error.message);
        reject(error);
      } else {
        console.log("Command output:", stdout);
        resolve();
      }
    });
  });
}

async function main() {
  try {
    const commands = [
      `yarn openapi-typescript https://events.tools.planetradio.co.uk/api/api-json?access_key=${
        process.env.EVENTS_API_ACCESS_KEY ?? ""
      } -o ./src/schemas/events/index.ts`,
      `yarn openapi-typescript ./src/api-spec/listenApiSpec.yml -o ./src/schemas/lapi/index.ts`,
      `yarn openapi-typescript https://helix.apollo.audio/content/api-json?access_key=${
        process.env.RAYO_CONTENT_ACCESS_KEY ?? ""
      } -o ./src/schemas/content/index.ts`,
      `yarn openapi-typescript https://subscriptions.apollo.audio/api-json?access_key=${
        process.env.SUBSCRIPTIONS_ACCESS_KEY ?? ""
      } -o ./src/schemas/subscriptions/index.ts`,
      `yarn openapi-typescript https://account.planetradio.co.uk/api-specs/spec.yaml?access_key=${
        process.env.SHEPHERD_ACCESS_KEY ?? ""
      } -o ./src/schemas/shepherd/index.ts`,
    ];

    const commandPromises = commands.map(runCommand);
    await Promise.all(commandPromises);
  } catch (error) {
    console.error("Main function error:", error);
  }
}

void main();
