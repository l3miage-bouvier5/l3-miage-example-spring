package fr.uga.l3miage.example.exception.technical;

/**
 * Exception technique
 */
public class MultipleEntityHaveSameLabelException extends Exception{
    public MultipleEntityHaveSameLabelException(String message) {
        super(message);
    }

    public MultipleEntityHaveSameLabelException(String message, Throwable cause) {
        super(message, cause);
    }
}