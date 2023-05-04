package fr.uga.l3miage.example.exception.technical;

import lombok.Getter;

@Getter
public class MiahootEntityNotFoundException extends Exception {
    private final String userId;
    private final String nom;

    public MiahootEntityNotFoundException(String message, String userId, String nom) {
        super(message);
        this.userId = userId;
        this.nom = nom;
    }

    public MiahootEntityNotFoundException(String message, String userId, String nom, Throwable cause) {
        super(message, cause);
        this.userId = userId;
        this.nom = nom;
    }

}
