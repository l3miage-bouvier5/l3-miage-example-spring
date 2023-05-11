package fr.uga.l3miage.example.component;

import fr.uga.l3miage.example.exception.technical.*;
import fr.uga.l3miage.example.mapper.MiahootMapper;
import fr.uga.l3miage.example.models.MiahootEntity;
import fr.uga.l3miage.example.models.QuestionEntity;
import fr.uga.l3miage.example.repository.MiahootRepository;
import fr.uga.l3miage.example.response.Miahoot;
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
                        String.format("Aucune entité n'a été trouvée pour userId [%s] et nom [%s]", userId, nom),
                        userId, nom));
    }

    public List<MiahootEntity> getMiahoot(final String userId) throws MiahootListEntityNotFoundException {
        List<MiahootEntity> l = miahootRepository.findAllByUserId(userId);
        if (l.size() > 0)
            return l;
        else
            throw new MiahootListEntityNotFoundException(
                    String.format("Aucune entité n'a été trouvée pour le userId [%s]", userId), userId);
    }

    public MiahootEntity createMiahoot(final MiahootEntity entity)
            throws MiahootAlreadyExistException, MiahootEmptyException, MiahootQuestionEmptyException,
            DuplicationLabelReponsePourUneQuestionException, NbReponsesVraiInvalidException {
        // userId is present and nom is present -> throw MiahootAlreadyExistException
        // userId is not present -> all good
        // userId present and nom isnt -> all good
        if (miahootRepository.findByUserIdAndNom(entity.getUserId(), entity.getNom()).isPresent()) {
            throw new MiahootAlreadyExistException(
                    String.format("la question (%s) a plusieur reponse vrai", entity.getUserId()), entity.getUserId());
        }

        if (entity.getQuestions() == null || entity.getQuestions().isEmpty()) {
            throw new MiahootEmptyException(String.format("Le miahoot ne contient aucune question", entity.getUserId()),
                    entity.getUserId());
        }

        // verifier que chaque question contient au moins une reponse
        for (QuestionEntity q : entity.getQuestions()) {
            if (q.getReponses() == null || q.getReponses().isEmpty()) {
                throw new MiahootQuestionEmptyException(
                        String.format("le miahoot [%s] du user [%s] a la question [%s] vide ou null",
                                entity.getNom(), entity.getUserId(), q.getLabel()),
                        entity.getNom(), entity.getUserId(), q.getLabel());
            }
        }

        for (QuestionEntity q : entity.getQuestions()) {
            if (QuestionComponent.existeRepetitionLabelReponses(q.getReponses()) == true) {
                throw new DuplicationLabelReponsePourUneQuestionException(
                        String.format(
                                "le miahoot [%s] du user [%s] a la question [%s] avec une ou plusieurs réponses identiques",
                                entity.getNom(), entity.getUserId(), q.getLabel()));
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
        throws MiahootEntityNotFoundException, MiahootEmptyException, MiahootQuestionEmptyException, DuplicationLabelReponsePourUneQuestionException, NbReponsesVraiInvalidException{ // , MiahootAlreadyExistException, MiahootUserIdNotSameException 
        // diff userId -> throw MiahootUserIdNotSameException
        // same userId diff nom -> check if new miahoot exists
        /*MiahootEntity actualEntity = miahootRepository.findByUserIdAndNom(userId, nom)
                .orElseThrow(() -> new MiahootEntityNotFoundException(
                        String.format("Aucune entité n'a été trouvée pour userId [%s] et nom [%s]", userId, nom),
                        userId, nom));

        if (!userId.equals(miahoot.getUserId())) {
            throw new MiahootUserIdNotSameException(String.format(
                    "Le userId [%s] est différent du userId [%s] de l'entité Miahoot", userId, miahoot.getUserId()));
        }
        if (!nom.equals(miahoot.getNom())
                && miahootRepository.findByUserIdAndNom(miahoot.getUserId(), miahoot.getNom()).isPresent()) {
             throw new MiahootAlreadyExistException("Le miahoot existe déjà en BD.","");
        }
        miahootMapper.mergeMiahootEntity(actualEntity, miahoot);
        return miahootRepository.save(actualEntity);*/

        // ancien miahoot pas trouvé
        MiahootEntity oldEntity = miahootRepository.findByUserIdAndNom(miahoot.getUserId(), oldName)
                .orElseThrow(() -> new MiahootEntityNotFoundException(
                        String.format("Aucun Miahoot de nom [%s] n'a été trouvée dans la BD pour le update", oldName), miahoot.getUserId(), oldName ));

        
        //if (miahoot.getQuestions() == null || miahoot.getQuestions().isEmpty()) {
        //    throw new MiahootEmptyException(String.format("Le nouveau miahoot ne contient aucune question", miahoot.getUserId()),
        //            miahoot.getUserId());
        //}

        // verifier que chaque question contient au moins une reponse
        /*  for (QuestionEntity q : entity.getQuestions()) {
            if (q.getReponses() == null || q.getReponses().isEmpty()) {
                throw new MiahootQuestionEmptyException(
                        String.format("le miahoot [%s] du user [%s] a la question [%s] vide ou null",
                                entity.getNom(), entity.getUserId(), q.getLabel()),
                        entity.getNom(), entity.getUserId(), q.getLabel());
            }
        }

        // existe une repetition de label de reponse pour une question
        for (QuestionEntity q : entity.getQuestions()) {
            if (QuestionComponent.existeRepetitionLabelReponses(q.getReponses()) == true) {
                throw new DuplicationLabelReponsePourUneQuestionException(
                        String.format(
                                "le miahoot [%s] du user [%s] a la question [%s] avec une ou plusieurs réponses identiques",
                                entity.getNom(), entity.getUserId(), q.getLabel()));
            }
        }

        // 
        for (QuestionEntity q : entity.getQuestions()) {
            if (QuestionComponent.nbReponsesVrai(q) == 0) {
                throw new NbReponsesVraiInvalidException(String.format(
                        "le miahoot [%s] du user [%s] a la question [%s] avec aucune réponse vrai",
                        entity.getNom(), entity.getUserId(), q.getLabel()));
            }
        }
        */
        // supprimer l'encien miahoot
        //miahootRepository.deleteByUserIdAndNom(oldEntity.getUserId(), oldEntity.getNom());
        //this.deleteMiahoot(oldEntity.getUserId(), oldEntity.getNom());
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
                    String.format("Les entités avec userId [%s] à supprimer n'ont pas été trouvées", userId), userId);
        }
        for (MiahootEntity m : l) {
            miahootRepository.deleteByUserIdAndNom(userId, m.getNom());
        }
    }

}
