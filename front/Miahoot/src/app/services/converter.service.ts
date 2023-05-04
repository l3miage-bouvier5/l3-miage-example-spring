import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Miahoot, Question } from '../miahoot';


@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  constructor(private http: HttpClient) { }

    

  getQuestion(label: string): Promise<JSON>{
  
    const getJson = this.http.get<JSON>(`/api/v0/question/`+label);

    return lastValueFrom(getJson)
  }

  async getQuestionByLabel(label : string):Promise<Question>{
    const jsonQuestion = await this.getQuestion(label)


    const questionString = JSON.stringify(jsonQuestion)
  

    const question  :Question = JSON.parse(questionString)

    return question
  }


  getMiahootByNom(uid : string, nom : string) : Promise<JSON>{
    const getJson = this.http.get<JSON>(`/api/v0/miahoot/${uid}/${nom}`)

    return lastValueFrom(getJson)  
  }

  async getMiahoot(uid:string , nom:string) : Promise<Miahoot>{
    const jsonMiahoot = await this.getMiahootByNom(uid,nom)

    const miahootString = JSON.stringify(jsonMiahoot)

    const miahoot : Miahoot = JSON.parse(miahootString)

    return miahoot
  }


}
