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
    const m =  await lastValueFrom(this.http.get<Miahoot>(`/api/v0/miahoot/${uid}/${nom}`))
    return m
  }

  async postMiahoot(uid:string, nom:string) {
    return lastValueFrom(this.http.post<Miahoot>(`/api/v0/miahoot/${uid}/${nom}`,{uid:uid,nom:nom}))
  }

  async getMiahoots(uid: string) : Promise<Miahoot[]>{
    const miahoots = await lastValueFrom(this.http.get<Miahoot[]>(`/api/v0/miahoot/${uid}`))
    miahoots.forEach(m => m.questions.forEach(question => question.reponses.sort(() => Math.random() - 0.5)))
    return miahoots
  }

}
