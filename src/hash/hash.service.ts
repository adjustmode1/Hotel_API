import { HttpException, Injectable } from '@nestjs/common';
import * as bscrypt from 'bcrypt';

@Injectable()
export class HashService {
  private key = 'secret key for app';
  private round = 10;

  hash(password): Promise<string> {
    return new Promise((resolve) => {
      bscrypt.genSalt(this.round, (err, salt) => {
        bscrypt.hash(password, salt, (err, hash) => {
          if (err) throw new HttpException('server Error', 500);
          resolve(hash);
        });
      });
    });
  }

  compare(password, hash) {
    return new Promise((resolve) => {
      bscrypt.compare(password, hash, (err, result) => {
        if (err) throw new HttpException('server Error', 500);
        resolve(result);
      });
    });
  }
}
