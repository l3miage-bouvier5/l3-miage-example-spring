package fr.uga.l3miage.example.config.handler;

import fr.uga.l3miage.example.error.ErrorResponse;
import fr.uga.l3miage.example.error.MiahootEmptyErrorResponse;
import fr.uga.l3miage.example.error.MiahootNotFoundErrorResponse;
import fr.uga.l3miage.example.exception.rest.MiahootEmptyRestException;
import fr.uga.l3miage.example.exception.rest.MiahootEntityNotFoundRestException;
import fr.uga.l3miage.example.exception.rest.MiahootQuestionEmptyRestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;

@ConditionalOnWebApplication
@RequiredArgsConstructor
@ControllerAdvice
@Slf4j
public class MiahootCreationFailedExceptionHandler {

    @ExceptionHandler({MiahootEmptyRestException.class, MiahootQuestionEmptyRestException.class})
    public ResponseEntity<ErrorResponse> handle(HttpServletRequest httpServletRequest, Exception exception) {
        if (exception instanceof MiahootEmptyRestException) {
            MiahootEmptyRestException ex = (MiahootEmptyRestException) exception;
            final MiahootEmptyErrorResponse response = MiahootEmptyErrorResponse.builder()
                    .uri(httpServletRequest.getRequestURI())
                    .httpStatus(ex.getHttpStatus())
                    .errorCode(ex.getErrorCode())
                    .errorMessage(ex.getMessage())
                    .build();
            log.warn(ex.getMessage());
            return ResponseEntity.status(ex.getHttpStatus()).body(response);
        } else {
//            if (exception instanceof MiahootQuestionEmptyRestException) {
            MiahootQuestionEmptyRestException ex = (MiahootQuestionEmptyRestException) exception;
            final MiahootNotFoundErrorResponse response = MiahootNotFoundErrorResponse.builder()
                    .uri(httpServletRequest.getRequestURI())
                    .httpStatus(ex.getHttpStatus())
                    .errorCode(ex.getErrorCode())
                    .errorMessage(ex.getMessage())
                    .build();
            log.warn(ex.getMessage());
            return ResponseEntity.status(ex.getHttpStatus()).body(response);
        }
    }
}
