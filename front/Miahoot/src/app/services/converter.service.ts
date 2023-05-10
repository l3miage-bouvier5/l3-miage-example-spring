import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, lastValueFrom, of, retry, take, throwError } from 'rxjs';
import { Miahoot, Question } from '../miahoot';


@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  bsErrorMessage = new BehaviorSubject<string>("")

  constructor(private http: HttpClient) { }

  async getQuestionByLabel(label : string):Promise<Question>{
    return lastValueFrom( this.http.get<Question>(`/api/v0/question/`+label) );
  }

  async getMiahoot(uid:string , nom:string) : Promise<Miahoot>{
    const m =  await lastValueFrom(this.http.get<Miahoot>(`/api/v0/miahoot/${uid}/${nom}`))
    return m
  }

  async postMiahoot(uid:string, json:string) : Promise<HttpErrorResponse | any> {
    const res = JSON.parse(json);

    try {
      
      const truc = lastValueFrom(this.http.post<any>(`/api/v0/miahoot/${uid}`,res));
      
      return truc;

    } catch (error: any) {
      return error;
    }
    
  }

  async getMiahoots(uid: string) : Promise<Miahoot[]>{
    const miahoots = await lastValueFrom(this.http.get<Miahoot[]>(`/api/v0/miahoot/${uid}`))
    miahoots.forEach(m => m.questions.forEach(question => question.reponses.sort(() => Math.random() - 0.5)))
    return miahoots
  }

}
