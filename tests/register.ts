// Preload dla "node --import": wczytuje .env i tworzy tabele przed
// uruchomieniem testów, żeby nie trzeba było najpierw ręcznie uruchamiać serwera.
import { initSchema } from "../src/db.ts";

try {
  process.loadEnvFile();
} catch {
  // brak .env — w porządku, jeśli DATABASE_URL jest już ustawione w środowisku
}

await initSchema();
