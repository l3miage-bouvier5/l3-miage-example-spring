package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import fr.uga.l3miage.example.request.CreateMiahootRequest;
import lombok.Getter;

import org.springframework.http.HttpStatus;

@Getter
public class MiahootEmptyRestException extends RuntimeException {
    private final CreateMiahootRequest request;

    public MiahootEmptyRestException(String message, CreateMiahootRequest request) {
        super(message);
        this.request = request;
    }

    public MiahootEmptyRestException(String message, CreateMiahootRequest request, Throwable cause) {
        super(message, cause);
        this.request = request;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }

    public ErrorCode getErrorCode() {
        return ErrorCode.MIAHOOT_IS_EMPTY;
    }
}
