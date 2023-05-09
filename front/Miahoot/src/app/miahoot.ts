import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from "@angular/fire/firestore"

export interface Question {
    readonly label: string
    readonly reponses: Reponse[]
}

export interface Reponse {
    readonly label: string
    readonly estValide: boolean
}

export interface Miahoot {
    readonly nom: string
    readonly questions : Question[]
}



export interface MiahootUser {
    name: string
    email: string
    miahootProjected: string
    photoURL: string
}


export type VOTES = {
  [participantUID: string]: number[]
}


export interface QCMProjected {
  id: string;
  correctanwser: number;
  question: string;
  responses: string[]; // Les réponses possibles
  votes: VOTES; // Autant d'entrée dans le tableau que de réponses possibles
}
export interface MiahootProjected {
  readonly id: string;
  creator: string;
  presentator: string;
  currentQCM: string;
}
export const FsMiahootProjectedConverter: FirestoreDataConverter<MiahootProjected> = {
  toFirestore: M => M,
  fromFirestore: snap => ({
    id: snap.id,
    creator: snap.get("creator"),
    presentator: snap.get("presentator"),
    currentQCM: snap.get("currentQCM")
  })
}

export const conv : FirestoreDataConverter<MiahootUser> = {
    toFirestore : val => val,
    fromFirestore: snap => ({
      name : snap.get("name"),
      email : snap.get("email"),
      miahootProjected : snap.get("miahootProjected"),
      photoURL : snap.get("photoURL")})
}


export const FsQCMProjectedConverter: FirestoreDataConverter<QCMProjected> = {
  toFirestore: Q => Q,
  fromFirestore: snap => ({
      id: snap.id,
      correctanwser: snap.get("correctanwser"),
      question: snap.get("question"),
      responses: snap.get("responses"),
      votes: snap.get("votes"),
  })
}











