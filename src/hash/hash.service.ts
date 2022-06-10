import { HttpException, Injectable } from '@nestjs/common';
import * as bscrypt from 'bcrypt';

@Injectable()
export class HashService {
    private key:string = "secret key for app";
    private round:number = 10;
    constructor(){}

    hash(password): Promise<any>{
        return new Promise(resolve=>{
            bscrypt.genSalt(this.round,(err,salt)=>{
                bscrypt.hash(password,salt,(err,hash)=>{
                    if(err)
                        throw new HttpException("server Error",500);
                    resolve(hash)
                })
            })
        })
    }

    compare(password,hash){
        console.log(password+"/"+hash)
        return new Promise(resolve=>{
            bscrypt.compare(password,hash,(err,result)=>{
                console.log(err)
                if(err)
                    throw new HttpException("server Error",500)
                resolve(result)
            });
        })
    }
}
