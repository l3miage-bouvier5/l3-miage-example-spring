package fr.uga.l3miage.example.exception.rest;

import org.springframework.http.HttpStatus;

import fr.uga.l3miage.example.error.ErrorCode;
import lombok.Getter;

@Getter
public class NbReponsesVraiInvalidRestException extends RuntimeException{
    private final String description;

    public NbReponsesVraiInvalidRestException(String message, String description) {
        super(message);
        this.description = description;
    }

    public NbReponsesVraiInvalidRestException(String message, String description, Throwable cause) {
        super(message, cause);
        this.description = description;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.UNPROCESSABLE_ENTITY;
    }

    public ErrorCode getErrorCode(){return ErrorCode.NOMBRE_REPONSE_VRAI_INVALIDE_POUR_UNE_QUESTION;}
}
