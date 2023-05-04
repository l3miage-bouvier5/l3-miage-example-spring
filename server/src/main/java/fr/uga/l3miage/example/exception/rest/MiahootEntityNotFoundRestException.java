package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class MiahootEntityNotFoundRestException extends RuntimeException {
    private final String userId;
    private final String nom;

    public MiahootEntityNotFoundRestException(String message, String userId, String nom) {
        super(message);
        this.userId = userId;
        this.nom = nom;
    }

    public MiahootEntityNotFoundRestException(String message, String userId, String nom, Throwable cause) {
        super(message, cause);
        this.userId = userId;
        this.nom = nom;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }

    public ErrorCode getErrorCode() {
        return ErrorCode.MIAHOOT_IS_NOT_FOUND;
    }
}
