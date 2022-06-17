import * as mongoose from 'mongoose';

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: () => {
      mongoose.connect(
        'mongodb+srv://thanhhuy:thanhhuy@cluster0.a0gzx.mongodb.net/?retryWrites=true&w=majority',
      );
    },
  },
];
