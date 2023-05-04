package fr.uga.l3miage.example.error;

/**
 * Représente les codes d'erreur possibles pour une errorResponse
 * Va permettre d'être le discriminant lors de la deserialization des erreurs
 */
public enum ErrorCode {
    TEST_INT_IS_ZERO_ERROR,
    IS_NOT_TEST_ERROR,
    TEST_IS_NOT_FOUND,
    DESCRIPTION_ALREADY_USE_ERROR,
    TEST_ENTITY_NOT_DELETED_ERROR,
    NOMBRE_REPONSE_VRAI_INVALIDE_POUR_UNE_QUESTION,
    DUPLICATION_LABEL_REPONSE_D_UNE_QUESTION,
    QUESTION_ERROR,
    NOT_FOUND,
    MIAHOOT_IS_EMPTY,
    MIAHOOTQUESTIONEMPTY,
    MIAHOOT_ALREADY_EXISTS,
    MIAHOOT_IS_NOT_FOUND,
    MIAHOOT_LIST_IS_NOT_FOUND,
}
