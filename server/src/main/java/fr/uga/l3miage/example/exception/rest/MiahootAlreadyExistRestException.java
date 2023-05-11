package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import fr.uga.l3miage.example.request.CreateMiahootRequest;
import fr.uga.l3miage.example.response.Miahoot;
import lombok.Getter;

import org.springframework.http.HttpStatus;

@Getter
public class MiahootAlreadyExistRestException extends RuntimeException {
    private final CreateMiahootRequest request;
    private final Miahoot response;

    
    public MiahootAlreadyExistRestException(String message, CreateMiahootRequest request) {
        super(message);
        this.request = request;
        this.response = null;
    }

    public MiahootAlreadyExistRestException(String message, Miahoot response) {
        super(message);
        this.request = null;
        this.response = response;
    }

    public MiahootAlreadyExistRestException(String message, CreateMiahootRequest request, Throwable cause) {
        super(message, cause);
        this.request = request;
        this.response = null;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }

    public ErrorCode getErrorCode() {
        return ErrorCode.MIAHOOT_ALREADY_EXISTS;
    }
}
