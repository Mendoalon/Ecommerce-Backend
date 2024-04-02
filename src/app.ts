import { AppRoutes } from './application/routes/routes';
import { Server } from './application/server';
import { envs } from './config/envs';

const main = async () => {
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
