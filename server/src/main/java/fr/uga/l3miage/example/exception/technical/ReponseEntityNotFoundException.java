package fr.uga.l3miage.example.exception.technical;

import lombok.Getter;


@Getter
public class ReponseEntityNotFoundException extends Exception {
    private final String label;

    public ReponseEntityNotFoundException(String message, String label) {
        super(message);
        this.label = label;
    }

    public ReponseEntityNotFoundException(String message, String label, Throwable cause) {
        super(message, cause);
        this.label = label;
    }
}