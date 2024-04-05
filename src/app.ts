import { AppRoutes } from './application/routes/routes';
import { Server } from './application/server';
import { envs } from './config/envs';
import { MongoDatabase } from './infrastructure';



(async () => {
  try {
      // Inicialización de la base de datos
       await MongoDatabase.connect({
           dbName: envs.MONGO_DB_NAME,
           mongoUrl: envs.MONGO_URL,
       });

      // Inicio de nuestro servidor
      new Server({
          port: envs.PORT,
          routes: AppRoutes.routes
      }).start();
      
  } catch (error) {
      console.error("Error during app initialization:", error);
  }
})();