package fr.uga.l3miage.example.exception.technical;

import lombok.Getter;

/**
 * Exception levée lorsqu'un Miahoot existe déjà (même userId et nom)
 */
@Getter
public class MiahootAlreadyExistException extends Exception {
    private final String userId;
    private final String nom;

    public MiahootAlreadyExistException(String message, String userId, String nom) {
        super(message);
        this.userId = userId;
        this.nom = nom;
    }

    public MiahootAlreadyExistException(String message, String userId, String nom, Throwable cause) {
        super(message, cause);
        this.userId = userId;
        this.nom = nom;
    }

}
