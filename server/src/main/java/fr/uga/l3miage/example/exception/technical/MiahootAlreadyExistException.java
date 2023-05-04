package fr.uga.l3miage.example.exception.technical;

import lombok.Getter;

@Getter
public class MiahootAlreadyExistException extends Exception {
    private final String description;

    public MiahootAlreadyExistException(String message, String description) {
        super(message);
        this.description = description;
    }

    public MiahootAlreadyExistException(String message, String description, Throwable cause) {
        super(message, cause);
        this.description = description;
    }
}
