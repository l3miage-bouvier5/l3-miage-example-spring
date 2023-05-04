package fr.uga.l3miage.example.exception.technical;

import lombok.Getter;


@Getter
public class MiahootQuestionEmptyException extends Exception{
    // entity.getNom(), entity.getUserId(), q.getLabel()
    private final String nom;
    private final String userId;
    private final String label;

    public MiahootQuestionEmptyException(String message, String nom, String userId, String label, Throwable cause) {
        super(message, cause);
        this.userId = userId;
        this.nom = nom;
        this.label = label;
    }

    public MiahootQuestionEmptyException(String message, String nom, String userId, String label) {
        super(message);
        this.userId = userId;
        this.nom = nom;
        this.label = label;
    }
    
    }


