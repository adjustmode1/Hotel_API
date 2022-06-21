import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JsonwebtokenService {
  constructor(private jsonwebtokenService: JwtService) {}

  sign(str: object) {
    return this.jsonwebtokenService.sign({ info: str });
  }

  check(str) {
    try {
      const result = this.jsonwebtokenService.verify(str);
      return {
        status: 200,
        data: result,
      };
    } catch (error) {
      return {
        status: 400,
        data: error,
      };
    }
  }
}
