import { Connection } from 'mongoose';

export const testDBProvider = [
  {
    provider: 'TESTDB_MODEL',
    useFactory: (connection: Connection) => {
      connection.model('testdb');
    },
  },
];
