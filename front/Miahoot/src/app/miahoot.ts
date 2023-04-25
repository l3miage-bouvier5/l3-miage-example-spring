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
    readonly name: string
    readonly photo: string
}

export interface MiahootConcepteur extends MiahootUser {
    readonly miahoots: Miahoot[]
}










