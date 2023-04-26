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

export const conv : FirestoreDataConverter<MiahootUser> = {
    toFirestore : val => val,
    fromFirestore: snap => ({
      name : snap.get("name"),
      email : snap.get("email"),
      miahootProjected : snap.get("miahootProjected"),
      photoURL : snap.get("photoURL")})
}
  










