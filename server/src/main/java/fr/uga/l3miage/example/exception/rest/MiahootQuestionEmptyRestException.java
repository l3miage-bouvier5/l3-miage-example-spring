package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import org.springframework.http.HttpStatus;

public class MiahootQuestionEmptyRestException extends RuntimeException{

    public MiahootQuestionEmptyRestException(String message, Throwable cause) {
        super(message, cause);
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }

    public ErrorCode getErrorCode(){return ErrorCode.QUESTION_ERROR;}
}
