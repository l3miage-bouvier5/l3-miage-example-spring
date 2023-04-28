package fr.uga.l3miage.example.exception.rest;

import fr.uga.l3miage.example.error.ErrorCode;
import fr.uga.l3miage.example.request.CreateReponseRequest;
import lombok.Getter;
import org.springframework.http.HttpStatus;



@Getter
public class IsNotReponseRestException extends RuntimeException {
    private final CreateReponseRequest request;

    public IsNotReponseRestException(String message, CreateReponseRequest request) {
        super(message);
        this.request = request;
    }

    public IsNotReponseRestException(String message,CreateReponseRequest request, Throwable cause) {
        super(message, cause);
        this.request = request;
    }

    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }

    public ErrorCode getErrorCode(){return ErrorCode.IS_NOT_TEST_ERROR;}

}