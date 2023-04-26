package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import fr.uga.l3miage.example.request.CreateMiahootRequest;
import fr.uga.l3miage.example.request.CreateTestRequest;
import org.springframework.http.HttpStatus;

public class MiahootAlreadyExistRestException extends Exception {
    private final CreateMiahootRequest request;

    public MiahootAlreadyExistRestException(String message){super(message);};

    public MiahootAlreadyExistRestException(String message, CreateMiahootRequest request) {

        super(message);
        this.request = request;
    }

    public MiahootAlreadyExistRestException(String message, CreateMiahootRequest request, Throwable cause) {
        super(message, cause);
        this.request = request;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }

}
