package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class MiahootListEntityNotFoundRestException extends RuntimeException {
    private final String userId;

    public MiahootListEntityNotFoundRestException(String message, String userId) {
        super(message);
        this.userId = userId;
    }

    public MiahootListEntityNotFoundRestException(String message, String userId, Throwable cause) {
        super(message, cause);
        this.userId = userId;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }

    public ErrorCode getErrorCode() {
        return ErrorCode.MIAHOOT_LIST_IS_NOT_FOUND;
    }
}
