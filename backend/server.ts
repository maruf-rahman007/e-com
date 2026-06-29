import "./src/config/env"; // validates env vars on startup
import app from "./src/app";
import { env } from "./src/config/env";

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});
