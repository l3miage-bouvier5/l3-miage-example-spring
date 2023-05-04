package fr.uga.l3miage.example.exception.technical;

import lombok.Getter;

@Getter
public class MiahootEmptyException extends Exception {
    private final String description;

    public MiahootEmptyException(String message, String description) {
        super(message);
        this.description = description;
    }

    public MiahootEmptyException(String message, String description, Throwable cause) {
        super(message, cause);
        this.description = description;
    }
}
