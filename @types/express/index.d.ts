declare namespace Express {
  interface Request {
    director?: import('../../src/resources/directors/director.interface').IDirector;
  }
  interface Response {
    errorMessage?: string;
  }
}
