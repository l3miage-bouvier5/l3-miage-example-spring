import { MiahootConcepteur, MiahootUser } from '../miahoot';
import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, getAuth, signInAnonymously, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { docData, Firestore, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { filter, map, Observable, of, switchMap, tap } from 'rxjs';


const conv : FirestoreDataConverter<MiahootConcepteur> = {
  toFirestore : val => val,
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ):MiahootConcepteur{
    const data = snapshot.data(options)!;
    
    return {
      name : data['name'],
      email: data['email'],
      miahoots: data['miahoots']
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export abstract class ConnexionService {

  obsMiahootConcepteur$ : Observable<MiahootConcepteur|undefined>;

  constructor(private auth: Auth, private fs : Firestore) {
    authState(this.auth).pipe(
      filter( u => !!u ),
      map( u => u as User ),
      tap( async u => {
        if(!u.isAnonymous){
          const docUser =  doc(this.fs, `concepteurs/${u.uid}`).withConverter(conv) ;
          const snapUser = await getDoc( docUser );
          if (!snapUser.exists()) {
            setDoc(docUser, {
              name: u.displayName ?? u.email ?? u.uid,
              email: u.email ?? "",
              miahoots: []
            } satisfies MiahootConcepteur)
        }
        }
      })
      ).subscribe()
    this.obsMiahootConcepteur$ = authState(this.auth).pipe(
      switchMap( (user) => {
        if(user){
          const userRef = doc(this.fs , `concepteurs/${user.uid}`).withConverter(conv)
          const userData$ = docData(userRef)
          return userData$
        } else{
          return of(undefined)
        }
      })
    )
  }


  // Fonction login() sert à connecter un utilisateur (concepteur ou presentateur)
  // @Entries email: string, password: string
  // @Output : Promise<MiahootConcepteur | void>
  async login(email: string, password: string): Promise<MiahootUser | void> {
    const connexion = signInWithEmailAndPassword(this.auth, email, password)
      .then((uc) => {
        // Signed in 
        const user = uc.user;
        console.log("Connexion success !", user);
      })
      .catch((error) => {
        console.log("Conexion failed ! ", error.code, " ", error.message);
      });

      return connexion;
  }

  
  async loginAnonymously() {
    signInAnonymously(this.auth)
      .then((uc) => {
        // Signed in
        const user = uc.user;
        console.log("Connexion success !", user);
      })
      .catch((error) => {
        console.log("Conexion failed ! ", error.code, " ", error.message);
      });
      
    }
  
  // Fonction logout() sert à déconnecter un utilisateur (concepteur ou presentateur)
  // @Entries 
  // @Output : Promise<void>
  async logout(): Promise<void> {
    const deconnexion = signOut(this.auth).then(() => {
      // Sign-out successful.
      console.log("Sign out success !");
    }).catch((error) => {
      // An error happened.
      console.log("Sign out failed ", error.code, " ", error.message)
    });

    return deconnexion;
  };


  // Fonction register() sert à enregistrer un nouvel utilisateur (concepteur ou presentateur)
  // @Entries name: string, email: string, password: string
  // @Output : Promise<MiahootUser | void>
  async register(name: string, email: string, password: string): Promise<MiahootUser | void> {

    const register = await createUserWithEmailAndPassword(this.auth, email, password)
    const user = register.user
    if(user){
      await updateDoc(doc(this.fs, 'users', user.uid), {name:name})
    }
    const res = {
      name:user.displayName,
      email:user.email
    } as MiahootUser
    
      return res;
  };

}
