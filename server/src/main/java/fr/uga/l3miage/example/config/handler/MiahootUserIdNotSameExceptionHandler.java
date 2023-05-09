package fr.uga.l3miage.example.config.handler;

import javax.servlet.http.HttpServletRequest;

import fr.uga.l3miage.example.error.MiahootUserIdNotSameErrorResponse;
import fr.uga.l3miage.example.exception.rest.MiahootUserIdNotSameRestException;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import fr.uga.l3miage.example.error.ErrorResponse;
import fr.uga.l3miage.example.error.MiahootAlreadyExistErrorResponse;
import fr.uga.l3miage.example.error.MiahootEmptyErrorResponse;
import fr.uga.l3miage.example.exception.rest.MiahootAlreadyExistRestException;
import fr.uga.l3miage.example.exception.rest.MiahootEmptyRestException;
import fr.uga.l3miage.example.exception.rest.MiahootQuestionEmptyRestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@ConditionalOnWebApplication
@RequiredArgsConstructor
@ControllerAdvice
@Slf4j
public class MiahootUserIdNotSameExceptionHandler {

    @ExceptionHandler({ MiahootUserIdNotSameRestException.class})
    public ResponseEntity<ErrorResponse> handle(HttpServletRequest httpServletRequest, Exception exception) {
        MiahootUserIdNotSameRestException ex = (MiahootUserIdNotSameRestException) exception;
            final MiahootUserIdNotSameErrorResponse response = MiahootUserIdNotSameErrorResponse.builder()
                    .uri(httpServletRequest.getRequestURI())
                    .httpStatus(ex.getHttpStatus())
                    .errorMessage(ex.getMessage())
                    .errorCode(ex.getErrorCode())
                    .build();
            log.warn(ex.getMessage());
            return ResponseEntity.status(ex.getHttpStatus()).body(response);
    }
}
