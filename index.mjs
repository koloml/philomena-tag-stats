import { existsSync } from "fs";
import "dotenv/config";

if (!existsSync('.env')) {
    console.error("Missing .env file! Please, copy the .env.example and fill connection info.");
    process.exit(1);
}

import('./src/application.mjs').then(({ Application }) => {
    new Application().run().then(() => {
        process.exit();
    })
});