declare namespace Express {
  interface Request {
    director?: import('../resources/directors/director.interface').IDirector;
  }
}
