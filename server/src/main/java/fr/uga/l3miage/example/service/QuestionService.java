package fr.uga.l3miage.example.service;

import fr.uga.l3miage.example.component.QuestionComponent;
import fr.uga.l3miage.example.exception.rest.LabelAlreadyExistRestException;
import fr.uga.l3miage.example.exception.rest.MiahootEntityNotFoundRestException;
import fr.uga.l3miage.example.exception.rest.QuestionEntityNotFoundRestException;
import fr.uga.l3miage.example.exception.technical.LabelAlreadyExistException;
import fr.uga.l3miage.example.exception.technical.MiahootEntityNotFoundException;
import fr.uga.l3miage.example.exception.technical.QuestionEntityNotFoundException;
import fr.uga.l3miage.example.mapper.QuestionMapper;
import fr.uga.l3miage.example.models.MiahootEntity;
import fr.uga.l3miage.example.models.QuestionEntity;
import fr.uga.l3miage.example.response.Miahoot;
import fr.uga.l3miage.example.response.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Dans un service, on va catcher toutes les exceptions techniques, vérifier les règles métiers et renvoyer des exceptions d'API<br>
 * Cette classe correspond à la logique métier de votre application<br>
 * Les Annotations :
 * <ul>
 *     <li>{@link Service} permet de créer un service spring, cette annotation est en quelque sorte un stéréotype d'un @{@link Bean}, car elle va permettre de créer un candidat à l'injection.</li>
 *     <li>{@link RequiredArgsConstructor} crée un constructeur avec les attributs finaux, ou les attributs annotés par {@link lombok.NonNull}.<br>Voir la doc <a href="https://projectlombok.org/features/constructor">projectlombok/feature/RequiredArgConstructor</a></li>
 * </ul>
 */
@Service
@RequiredArgsConstructor
public class QuestionService {
    private static final String ERROR_DETECTED = "Une erreur lors de la création de l'entité QuestionConfigWithProperties à été détecté.";
    private final QuestionComponent questionComponent;
    private final QuestionMapper questionMapper;


    /**
     * @param label la requête qui permet de créer une entité question
     */
    public void createQuestion(String label) {
        // QuestionEntity newQuestionEntity = questionMapper.toEntity(createQuestionRequest);
            try {
                questionComponent.createQuestion(label);
            } catch (LabelAlreadyExistException ex) {
                throw new LabelAlreadyExistRestException(ERROR_DETECTED,label,ex);
            }
    }


    public Question getQuestion(final String label) {
        try {

            return questionMapper.toDto(questionComponent.getQuestion(label));

        } catch (QuestionEntityNotFoundException ex) {
            throw new QuestionEntityNotFoundRestException(String.format("Impossible de charger l'entité. Raison : [%s]",ex.getMessage()));
        }
    }





}
