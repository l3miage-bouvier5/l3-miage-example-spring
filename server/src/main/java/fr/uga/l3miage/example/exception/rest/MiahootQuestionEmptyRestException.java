package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import fr.uga.l3miage.example.request.CreateMiahootRequest;
import fr.uga.l3miage.example.response.Miahoot;
import lombok.Getter;

import org.springframework.http.HttpStatus;

@Getter
public class MiahootQuestionEmptyRestException extends RuntimeException{
    // entity.getNom(), entity.getUserId(), q.getLabel()
    private final CreateMiahootRequest request;
    private final Miahoot response;
    public MiahootQuestionEmptyRestException(String message,CreateMiahootRequest request, Throwable cause) {
        super(message, cause);
        this.request = request;
        this.response = null;
    }

    public MiahootQuestionEmptyRestException(String message,Miahoot response, Throwable cause) {
        super(message, cause);
        this.response = response;
        this.request = null;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.UNPROCESSABLE_ENTITY;
    }

    public ErrorCode getErrorCode(){return ErrorCode.MIAHOOT_QUESTION_EMPTY;}
}
