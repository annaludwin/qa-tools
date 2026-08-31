import app from "./app.ts";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`\n✅ QA Tools is running!  Open in your browser:  http://localhost:${PORT}\n`);
});
