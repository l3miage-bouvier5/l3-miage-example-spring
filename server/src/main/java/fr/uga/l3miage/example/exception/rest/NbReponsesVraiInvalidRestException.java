package fr.uga.l3miage.example.exception.rest;

import org.springframework.http.HttpStatus;

import fr.uga.l3miage.example.error.ErrorCode;
import fr.uga.l3miage.example.request.CreateQuestionRequest;
import lombok.Getter;

@Getter
public class NbReponsesVraiInvalidRestException extends RuntimeException {
    private final CreateQuestionRequest request;

    public NbReponsesVraiInvalidRestException(String message, CreateQuestionRequest request) {
        super(message);
        this.request = request;
    }

    public NbReponsesVraiInvalidRestException(String message) {
        super(message);
        this.request = null;
    }

    public NbReponsesVraiInvalidRestException(String message, CreateQuestionRequest request, Throwable cause) {
        super(message, cause);
        this.request = request;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.UNPROCESSABLE_ENTITY;
    }

    public ErrorCode getErrorCode() {
        return ErrorCode.NOMBRE_REPONSE_VRAI_INVALIDE_POUR_UNE_QUESTION;
    }
}
