package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import fr.uga.l3miage.example.request.CreateMiahootRequest;
import fr.uga.l3miage.example.response.Miahoot;
import lombok.Getter;

import org.springframework.http.HttpStatus;

@Getter
public class MiahootEmptyRestException extends RuntimeException {
    private final CreateMiahootRequest request;
    private final Miahoot response;

    public MiahootEmptyRestException(String message, CreateMiahootRequest request) {
        super(message);
        this.request = request;
        this.response = null;
    }

    public MiahootEmptyRestException(String message, CreateMiahootRequest request, Throwable cause) {
        super(message, cause);
        this.request = request;
        this.response = null;
    }

    public MiahootEmptyRestException(String message, Miahoot response, Throwable cause) {
        super(message, cause);
        this.request = null;
        this.response = response;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.UNPROCESSABLE_ENTITY;
    }

    public ErrorCode getErrorCode() {
        return ErrorCode.MIAHOOT_IS_EMPTY;
    }
}
