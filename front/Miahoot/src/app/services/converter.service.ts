import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Question } from '../miahoot';


@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  private apiUrl = 'http://129.88.210.27:8080/api';

  constructor(private http: HttpClient) { }

    

  getQuestion(label: string): Promise<JSON>{
  
    const getJson = this.http.get<JSON>(`${this.apiUrl}/v0/question/`+label);

    return lastValueFrom(getJson)
  }

  async getQuestionByLabel(label : string):Promise<Question>{
    const jsonQuestion = await this.getQuestion(label)


    const questionString = JSON.stringify(jsonQuestion)
  

    const question  :Question = JSON.parse(questionString)

    console.log(question);

    return question
  }
}
