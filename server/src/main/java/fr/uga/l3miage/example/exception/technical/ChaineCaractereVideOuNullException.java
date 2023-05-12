package fr.uga.l3miage.example.exception.technical;

import lombok.Getter;

/**
 * Exception technique
 * Les annotations :
 * <ul>
 * <li>{@link Getter} permet de créer tout les getters de tous les attributs.
 * Voir la doc <a href=
 * "https://projectlombok.org/features/GetterSetter">projetlombok.org/features/Getter</a></li>
 * </ul>
 */
@Getter
public class ChaineCaractereVideOuNullException extends Exception {

    public ChaineCaractereVideOuNullException(String message) {
        super(message);
    }

    public ChaineCaractereVideOuNullException(String message, Throwable cause) {
        super(message, cause);
    }
}
