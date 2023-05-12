package fr.uga.l3miage.example.component;

import fr.uga.l3miage.example.exception.technical.*;
import fr.uga.l3miage.example.mapper.MiahootMapper;
import fr.uga.l3miage.example.models.MiahootEntity;
import fr.uga.l3miage.example.models.QuestionEntity;
import fr.uga.l3miage.example.repository.MiahootRepository;
import fr.uga.l3miage.example.response.Miahoot;
import fr.uga.l3miage.example.response.Question;
import io.micrometer.core.instrument.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MiahootComponent {
    private final MiahootRepository miahootRepository;
    private final MiahootMapper miahootMapper;

    public MiahootEntity getMiahoot(final String userId, final String nom) throws MiahootEntityNotFoundException {
        return miahootRepository.findByUserIdAndNom(userId, nom)
                .orElseThrow(() -> new MiahootEntityNotFoundException(
                        String.format("Aucune entité n'a été trouvée pour [%s]", nom),
                        userId, nom));
    }

    public List<MiahootEntity> getMiahoot(final String userId) throws MiahootListEntityNotFoundException {
        List<MiahootEntity> l = miahootRepository.findAllByUserId(userId);
        if (l.size() > 0)
            return l;
        else
            throw new MiahootListEntityNotFoundException(
                    String.format("Aucune entité n'a été trouvée pour ce userId "), userId);
    }

    public MiahootEntity createMiahoot(final MiahootEntity entity)
            throws MiahootAlreadyExistException, MiahootEmptyException, MiahootQuestionEmptyException,
            DuplicationLabelReponsePourUneQuestionException, NbReponsesVraiInvalidException,
            ChaineCaractereVideOuNullException {
        // userId is present and nom is present -> throw MiahootAlreadyExistException
        // userId is not present -> all good
        // userId present and nom isnt -> all good

        if ((StringUtils.isBlank(entity.getNom()))) {
            throw new ChaineCaractereVideOuNullException(String.format("le miahoot a un nom Vide ou Null"));

        }

        if (miahootRepository.findByUserIdAndNom(entity.getUserId(), entity.getNom()).isPresent()) {
            throw new MiahootAlreadyExistException("le miahoot existe déja en BD", entity.getUserId());
        }

        if (entity.getQuestions() == null || entity.getQuestions().isEmpty()) {
            throw new MiahootEmptyException(String.format("Le miahoot ne contient aucune question", entity.getUserId()),
                    entity.getUserId());
        }

        // verifier que chaque question contient au moins une reponse
        for (QuestionEntity q : entity.getQuestions()) {
            if (q.getReponses() == null || q.getReponses().isEmpty()) {
                throw new MiahootQuestionEmptyException(
                        String.format("le miahoot [%s] a la question [%s] vide ou null",
                                entity.getNom(), q.getLabel()),
                        entity.getNom(), entity.getUserId(), q.getLabel());
            }
        }

        for (QuestionEntity q : entity.getQuestions()) {
            if (QuestionComponent.existeRepetitionLabelReponses(q.getReponses()) == true) {
                throw new DuplicationLabelReponsePourUneQuestionException(
                        String.format(
                                "le miahoot [%s] a la question [%s] avec une ou plusieurs réponses identiques",
                                entity.getNom(), q.getLabel()));
            }
        }

        for (QuestionEntity q : entity.getQuestions()) {
            if (QuestionComponent.nbReponsesVrai(q) == 0) {
                throw new NbReponsesVraiInvalidException(String.format(
                        "le miahoot [%s] du user [%s] a la question [%s] avec aucune réponse vrai",
                        entity.getNom(), entity.getUserId(), q.getLabel()));
            }
        }

        return miahootRepository.save(entity);
    }

    public MiahootEntity updateMiahoot(final Miahoot miahoot, final String userId, String oldName)
            throws MiahootEntityNotFoundException, MiahootAlreadyExistException, MiahootEmptyException,
            MiahootQuestionEmptyException, DuplicationLabelReponsePourUneQuestionException,
            NbReponsesVraiInvalidException { // , MiahootAlreadyExistException, MiahootUserIdNotSameException
        MiahootEntity newEntityC = miahootMapper.toEntity(miahoot);
        // #########
        // ancien miahoot pas trouvé
        MiahootEntity oldEntity = miahootRepository.findByUserIdAndNom(miahoot.getUserId(), oldName)
                .orElseThrow(() -> new MiahootEntityNotFoundException(
                        String.format("Aucun Miahoot de nom [%s] n'a été trouvée dans la BD pour le update", oldName),
                        miahoot.getUserId(), oldName));

        // #########
        // nouveau miahoot existe déja dans la base
        if (miahootRepository.findByUserIdAndNom(miahoot.getUserId(), miahoot.getNom()).isPresent()) {
            throw new MiahootAlreadyExistException("le miahoot existe déja en BD");
            // throw new MiahootAlreadyExistException( "le miahoot existe déja en BD",
            // userId);
        }

        // #########
        if (miahoot.getQuestions() == null || miahoot.getQuestions().isEmpty()) {
            throw new MiahootEmptyException(
                    String.format("Le nouveau miahoot ne contient aucune question", miahoot.getUserId()),
                    miahoot.getUserId());
        }

        // #########
        // verifier que chaque question contient au moins une reponse
        for (Question q : miahoot.getQuestions()) {
            if (q.getReponses() == null || q.getReponses().isEmpty()) {
                throw new MiahootQuestionEmptyException(
                        String.format("le miahoot [%s] a une ou plusieurs question(s) vide(s) ou null",
                                miahoot.getNom()),
                        miahoot.getNom(), miahoot.getUserId(), q.getLabel());
            }
        }

        // existe une repetition de label de reponse pour une question
        for (QuestionEntity q : newEntityC.getQuestions()) {
            if (QuestionComponent.existeRepetitionLabelReponses(q.getReponses()) == true) {
                throw new DuplicationLabelReponsePourUneQuestionException(
                        String.format(
                                "le miahoot [%s]  a une question avec une ou plusieurs réponses identiques",
                                miahoot.getNom()));
            }
            if (QuestionComponent.nbReponsesVrai(q) == 0) {
                throw new NbReponsesVraiInvalidException(String.format(
                        "le miahoot [%s] a une question avec aucune réponse vrai",
                        miahoot.getNom()));
            }
        }

        /*
         * for (QuestionEntity q : newEntityC.getQuestions()) {
         * if (QuestionComponent.nbReponsesVrai(q) == 0) {
         * throw new NbReponsesVraiInvalidException(String.format(
         * "le miahoot [%s] du user [%s] a la question [%s] avec aucune réponse vrai",
         * entity.getNom(), entity.getUserId(), q.getLabel()));
         * }
         * }
         */
        // supprimer l'encien miahoot
        // miahootRepository.deleteByUserIdAndNom(oldEntity.getUserId(),
        // oldEntity.getNom());
        // this.deleteMiahoot(oldEntity.getUserId(), oldEntity.getNom());
        miahootMapper.mergeMiahootEntity(oldEntity, miahoot);
        return miahootRepository.save(oldEntity);
    }

    public void deleteMiahoot(final String userId, final String nom) throws MiahootEntityNotFoundException {
        // if looking for miahoot that doesnt exist -> entity not found exception
        // if looking for miahoot that exists -> delete

        if (!miahootRepository.findByUserIdAndNom(userId, nom).isPresent()) {
            throw new MiahootEntityNotFoundException(
                    String.format("L'entité [%s] avec le nom [%s] n'existe pas", userId, nom), userId, nom);
        }
        miahootRepository.deleteByUserIdAndNom(userId, nom);
    }

    public void deleteMiahoot(final String userId) throws MiahootListEntityNotFoundException {
        List<MiahootEntity> l = miahootRepository.findAllByUserId(userId);
        if (l.isEmpty()) {
            throw new MiahootListEntityNotFoundException(
                    String.format("Les entités avec ce userId à supprimer n'ont pas été trouvées"), userId);
        }
        for (MiahootEntity m : l) {
            miahootRepository.deleteByUserIdAndNom(userId, m.getNom());
        }
    }

}
