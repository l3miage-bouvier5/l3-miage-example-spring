package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import fr.uga.l3miage.example.request.CreateMiahootRequest;
import fr.uga.l3miage.example.request.CreateTestRequest;
import org.springframework.http.HttpStatus;

public class MiahootAlreadyExistRestException extends RuntimeException {
    private final String userId;
    private final String nom;

    public MiahootAlreadyExistRestException(String message, String userId, String nom) {
        super(message);
        this.userId = userId;
        this.nom = nom;
    };

    public MiahootAlreadyExistRestException(String message, String userId, String nom, Throwable cause) {
        super(message, cause);
        this.userId = userId;
        this.nom = nom;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }

    public ErrorCode getErrorCode() {
        return ErrorCode.MIAHOOT_ALREADY_EXIST_ERROR;
    }

}
