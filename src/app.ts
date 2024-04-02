import { AppRoutes } from './application/routes/routes';
import { Server } from './application/server';
import { envs } from './config/envs';
import { MongoDatabase } from './infrastructure';

const main = async () => {
  // Inicialización de la base de datos
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  // Inicio de nuestro servidor
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  try {
    await server.start();
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
    // Optionally perform additional error handling (e.g., logging, retrying)
  }
};

main().catch((error) => {
  console.error('Error al iniciar la aplicación:', error);
  // Handle any errors that reach this point (e.g., configuration issues)
});
