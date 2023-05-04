package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import fr.uga.l3miage.example.request.CreateMiahootRequest;
import lombok.Getter;

import org.springframework.http.HttpStatus;

@Getter
public class MiahootQuestionEmptyRestException extends RuntimeException{
    // entity.getNom(), entity.getUserId(), q.getLabel()
    private final CreateMiahootRequest request;
    public MiahootQuestionEmptyRestException(String message,CreateMiahootRequest request, Throwable cause) {
        super(message, cause);
        this.request = request;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.UNPROCESSABLE_ENTITY;
    }

    public ErrorCode getErrorCode(){return ErrorCode.MIAHOOT_QUESTION_EMPTY;}
}
