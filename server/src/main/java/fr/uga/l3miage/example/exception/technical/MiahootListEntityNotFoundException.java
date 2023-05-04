package fr.uga.l3miage.example.exception.technical;

import lombok.Getter;

@Getter
public class MiahootListEntityNotFoundException extends Exception {
    private final String userId;

    public MiahootListEntityNotFoundException(String message, String userId) {
        super(message);
        this.userId = userId;
    }

    public MiahootListEntityNotFoundException(String message, String userId, Throwable cause) {
        super(message, cause);
        this.userId = userId;
    }

}
