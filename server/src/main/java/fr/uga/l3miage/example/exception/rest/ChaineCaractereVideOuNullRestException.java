package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import fr.uga.l3miage.example.request.CreateMiahootRequest;
import fr.uga.l3miage.example.request.CreateQuestionRequest;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * Correspond à l'exception d'API d'une entité non trouvée<br>
 * Les annotations :
 * <ul>
 * <li>{@link Getter} permet de créer tout les getters de tous les attributs.
 * Voir la doc <a href=
 * "https://projectlombok.org/features/GetterSetter">projetlombok.org/features/Getter</a></li>
 * </ul>
 */
@Getter
public class ChaineCaractereVideOuNullRestException extends RuntimeException {

    public ChaineCaractereVideOuNullRestException(String message) {
        super(message);
    }

    public ChaineCaractereVideOuNullRestException(String message, Throwable cause) {
        super(message, cause);
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.UNPROCESSABLE_ENTITY;
    }

    public ErrorCode getErrorCode() {
        return ErrorCode.CHAINE_CARACTERE_VIDE_OU_NULL;
    }
}
