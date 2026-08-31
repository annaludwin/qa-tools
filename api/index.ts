// Wejście dla Vercel: ta sama aplikacja Express co lokalnie/na Render,
// tylko bez app.listen() — Vercel sam zarządza uruchamianiem funkcji.
import app from "../src/app.ts";

export default app;
