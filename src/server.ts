import config from './common/config';
import app from './app';
import { uncaughtExceptionHandler, unhandledRejectionHandler } from './common/errorHandler';


const { PORT } = config;

const server = app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
process.on('uncaughtException', uncaughtExceptionHandler(server, true));
process.on('unhandledRejection', unhandledRejectionHandler(server, false));
