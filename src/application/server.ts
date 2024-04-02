import express, { Router } from 'express';

interface ServerOptions {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app: express.Application;
  private readonly port: number;
  private readonly routes: Router;


  constructor(options: ServerOptions) {
    const { port = 3100, routes } = options;

    this.port = port;
    this.routes = routes;

    this.app = express();
  }

  async start(): Promise<void> {
    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Usar las rutas definidas
    this.app.use(this.routes);

    // Iniciar el servidor
    await this.app.listen(console.log(`Server ${this.port}`));


  }
}
