package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public class LabelAlreadyUseRestException extends RuntimeException {
    private final String label;

    public LabelAlreadyUseRestException(String message, String label) {
        super(message);
        this.label = label;
    }

    public LabelAlreadyUseRestException(String message, String label, Throwable cause) {
        super(message, cause);
        this.label = label;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }

    public ErrorCode getErrorCode(){return ErrorCode.DESCRIPTION_ALREADY_USE_ERROR;}
}
