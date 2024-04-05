export class CustomError extends Error {
    constructor(
      public readonly statusCode: number,
      public readonly message: string,
      public readonly timestamp: Date = new Date(),
      public readonly stackTrace?: string,
    ) {
      super(message);
    }
  
    static badRequest(message: string) {
      return new CustomError(400, message);
    }
  
    static unauthorized(message: string) {
      return new CustomError(401, message);
    }
  
    static forbidden(message: string) {
      return new CustomError(403, message);
    }
  
    static notFound(message: string) {
      return new CustomError(404, message);
    }
  
    static internalServer(message: string) {
      return new CustomError(500, message);
    }
  
    toJSON() {
      return {
        statusCode: this.statusCode,
        message: this.message,
        timestamp: this.timestamp.toISOString(),
        stackTrace: this.stackTrace,
      };
    }
  }
  
  