package fr.uga.l3miage.example.component;
import fr.uga.l3miage.example.exception.technical.*;
import fr.uga.l3miage.example.mapper.QuestionMapper;
import fr.uga.l3miage.example.models.QuestionEntity;
import fr.uga.l3miage.example.models.ReponseEntity;
import fr.uga.l3miage.example.models.TestEntity;
import fr.uga.l3miage.example.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

/**
 * Pour respecter l'architecture hexagonale, ici nous ne traitons que les données
 * <br>
 * Les Annotations :
 * <ul>
 *     <li>{@link Component} permet de créer un composant spring, cette annotation est en quelque sorte un stéréotype d'un @{@link Bean}, car elle va permettre de créer un candidat à l'injection.</li>
 *     <li>{@link RequiredArgsConstructor} crée un constructeur avec les attributs finaux, ou les attributs annotés par {@link lombok.NonNull}.<br>Voir la doc <a href="https://projectlombok.org/features/constructor">projectlombok/feature/RequiredArgConstructor</a></li>
 * </ul>
 */
@Component
@RequiredArgsConstructor
public class QuestionComponent {
    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    /**
     * @param label de l'entité Test à récupérer
     * @return une {@link TestEntity} correspondant à description donnée
     * @throws TestEntityNotFoundException si aucune entité Test n'est trouvée
     */
    public QuestionEntity getQuestion(final String label) throws QuestionEntityNotFoundException {
        return questionRepository.findByLabel(label)
                .orElseThrow(() -> new QuestionEntityNotFoundException(String.format("Aucune entité n'a été trouvée pour le label [%s]", label), label));

    }

    /**
     * @param label à créer en base de données
     */
    public void createQuestion(String label) throws LabelAlreadyExistException{

        if (questionRepository.findByLabel(label).isPresent()) {
            throw new LabelAlreadyExistException(String.format("La label %s existe déjà en BD.", label), label);
        }
        QuestionEntity newQuestion = new QuestionEntity();
        newQuestion.setLabel(label);
        questionRepository.save(newQuestion);
    }

    




//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
/**
     * @param entity à créer en base de données
     */
public void createQuestion(final QuestionEntity entity) throws NbReponsesVraiInvalidException, DuplicationLabelReponsePourUneQuestionException {

    /* 
     * if (entity.getReponses().isEmpty()) {
     * throw new NbReponsesVraiInvalidException(
     * String.format("La question (%s) doit avoir au moins une réponse.",
     * entity.getLabel()),
     * entity.getLabel());
     * }
     * // Il faut penser au cas où deux Question avec le même label
     */

     //si plusieurs réponses vrai throw
    if (nbReponsesVrai(entity) != 1) {
        throw new NbReponsesVraiInvalidException(
                String.format("la question (%s) a plusieur reponse vrai", entity.getLabel()), entity.getLabel());
    }
    // si repetition du label de réponse dans une question throw
    else if (existeRepetitionLabelReponses(entity.getReponses()) == true) {
        throw new DuplicationLabelReponsePourUneQuestionException(
                String.format("la question (%s) a des réponses avec le même label", entity.getLabel()),
                entity.getLabel());

    }
    else{
        questionRepository.save(entity);
    }

    
}







    // compte le nombre de réponse valide dans le set de reponse d'une 
    // question passé en argument
    public int nbReponsesVrai(QuestionEntity entity){
        int cmp=0; // compteur d'occurence de reponse vrai
        
        for(ReponseEntity r: entity.getReponses()){
            if(r.getEstValide()==true){
                cmp+=1;
            }
        }
       // entity.getReponses()
        return cmp;
    }

    // fonction qui vérifie s'il y a une duplication de labels des réponses dans un
    // ensemble de réponses
    public boolean existeRepetitionLabelReponses(Set<ReponseEntity> reponses) {

        boolean existeRepet = false;
        Set<String> labels = new HashSet<String>();
        for (ReponseEntity r : reponses) {
            labels.add(r.getLabel());
        }
        if (labels.size() != reponses.size()) {
            existeRepet = true;
        }
        return existeRepet;
    }
}
