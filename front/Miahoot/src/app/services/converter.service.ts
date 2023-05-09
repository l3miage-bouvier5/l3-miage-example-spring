import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Miahoot, Question } from '../miahoot';


@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor(private http: HttpClient) { }

  async getQuestionByLabel(label : string):Promise<Question>{
    return lastValueFrom( this.http.get<Question>(`/api/v0/question/`+label) );
  }

  async getMiahoot(uid:string , nom:string) : Promise<Miahoot>{
    return lastValueFrom(this.http.get<Miahoot>(`/api/v0/miahoot/${uid}/${nom}`))
  }


  async getMiahoots(uid: string) : Promise<Miahoot[]>{
    return lastValueFrom(this.http.get<Miahoot[]>(`/api/v0/miahoots/${uid}`))
  }

}
