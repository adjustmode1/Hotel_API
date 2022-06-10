import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JsonwebtokenService {
    constructor(private jsonwebtokenService:JwtService){}
    
    sign(str:object){
        return this.jsonwebtokenService.sign({info:str})
    }

    check(str){
        return this.jsonwebtokenService.verify(str)
    }
}
