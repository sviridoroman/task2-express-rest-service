import { getConnection, createConnection } from 'typeorm';

import ormconfig from './common/ormconfig';

export const DBconnection = async () => {
  let connection = null;

  try {
    connection = getConnection();
  } catch (error) {
    // handle error
  }

  try {
    if (connection && !connection.isConnected) {
      await connection.connect();
    } else {
      await createConnection(ormconfig);
    }

    console.log('DB connected');
  } catch (error) {
    console.log('Error to connect DB', error);
    process.exit(1);
  }
};

export default { DBconnection };
