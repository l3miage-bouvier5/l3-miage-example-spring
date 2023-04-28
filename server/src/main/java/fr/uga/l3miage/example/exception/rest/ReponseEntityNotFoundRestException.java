package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public class ReponseEntityNotFoundRestException extends RuntimeException {
    private final String label;

    public ReponseEntityNotFoundRestException(String message, String label) {
        super(message);
        this.label = label;
    }

    public ReponseEntityNotFoundRestException(String message, String label, Throwable cause) {
        super(message, cause);
        this.label = label;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }

    public ErrorCode getErrorCode(){return ErrorCode.TEST_IS_NOT_FOUND;}
}