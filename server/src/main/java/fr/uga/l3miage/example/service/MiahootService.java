package fr.uga.l3miage.example.service;

import fr.uga.l3miage.example.component.MiahootComponent;
import fr.uga.l3miage.example.config.handler.DuplicationLabelReponsePourUneQuestionExceptionHandler;
import fr.uga.l3miage.example.exception.rest.*;
import fr.uga.l3miage.example.exception.technical.*;
import fr.uga.l3miage.example.mapper.MiahootMapper;
import fr.uga.l3miage.example.models.MiahootEntity;
import fr.uga.l3miage.example.request.CreateMiahootRequest;
import fr.uga.l3miage.example.response.Miahoot;
import javassist.compiler.ast.NewExpr;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MiahootService {

    private static final String ERROR_DETECTED = "Une erreur lors de la création de l'entité MiahootConfigWithProperties à été détecté.";
    private final MiahootComponent miahootComponent;
    private final MiahootMapper miahootMapper;

    public Miahoot getMiahoot(final String userId, final String nom) {
        try {
            return miahootMapper.toDto(miahootComponent.getMiahoot(userId, nom));
        } catch (MiahootEntityNotFoundException ex) {
            throw new MiahootEntityNotFoundRestException(String.format("Impossible de charger l'entité. Raison : [%s]",
                    ex.getMessage()), userId, nom, ex);
        }
    }

    public List<Miahoot> getMiahoot(final String userId) {
        try {
            return miahootComponent.getMiahoot(userId).stream().map(miahootMapper::toDto).collect(Collectors.toList());
        } catch (MiahootListEntityNotFoundException ex) {
            throw new MiahootListEntityNotFoundRestException(
                    String.format("Impossible de charger l'entité. Raison : [%s]",
                            ex.getMessage()),
                    userId);
        }
    }

    public Miahoot createMiahoot(final CreateMiahootRequest createMiahootRequest, String userId) {
        MiahootEntity newMiahootEntity = miahootMapper.toEntity(createMiahootRequest);
        newMiahootEntity.setUserId(userId);
        try {
            return miahootMapper.toDto(miahootComponent.createMiahoot(newMiahootEntity));

        } catch (MiahootAlreadyExistException ex) {
            throw new MiahootAlreadyExistRestException(String.format(
                    "Une erreur lors de la création de l'entité Miahoot à été détecté: miahoot avec le même userId et nom = (%s)  déjà existant en base de donné",
                    newMiahootEntity.getNom()), createMiahootRequest, ex);
        } catch (MiahootQuestionEmptyException ex) {
            // throw new MiahootQuestionEmptyRestException("Une question no possède pas de
            // réponse", ex);
            throw new MiahootQuestionEmptyRestException(
                    String.format("le miahoot [%s] a une ou plusieurs question(s) vide(s) ou null",
                            newMiahootEntity.getNom()),
                    createMiahootRequest, ex);
        } catch (MiahootEmptyException ex) {
            throw new MiahootEmptyRestException(String.format(
                    "Une erreur lors de la création de l'entité Miahoot à été détecté: le miahoot (%s)  ne contient pas de questions",
                    newMiahootEntity.getNom()), createMiahootRequest, ex);
        } catch (DuplicationLabelReponsePourUneQuestionException ex) {
            throw new DuplicationLabelReponsePourUneQuestionRestException(String.format(
                    "Une erreur lors de la création de l'entité Miahoot à été détecté: le miahoot (%s) contient une ou plusieurs questions qui ont 2 réponses identiques",
                    newMiahootEntity.getNom()));
        } catch (NbReponsesVraiInvalidException ex) {
            throw new NbReponsesVraiInvalidRestException(String.format(
                    "Une erreur lors de la création de l'entité Miahoot à été détecté: le miahoot (%s) contient une ou plusieurs questions qui n'ont aucune réponse vraie",
                    newMiahootEntity.getNom()));
        }
    }

    public Miahoot updateMiahoot(final Miahoot miahoot, final String userId, String oldName) {
       //MiahootEntity newMiahootEntity = miahootMapper.toEntity(miahoot)
        //newMiahootEntity.setUserId(userId);
        //MiahootEntity newMiahootEntity = new MiahootEntity();
        //miahootMapper.mergeMiahootEntity(newMiahootEntity, miahoot);
        //newMiahootEntity.setUserId(userId);
        miahoot.setUserId(userId);
        try {
            return miahootMapper.toDto(miahootComponent.updateMiahoot(miahoot, userId, oldName));
        } catch (MiahootEntityNotFoundException ex) {
            throw new MiahootEntityNotFoundRestException("Le miahoot n'existe pas en base de donnée",
                    ex.getMessage(), userId, ex);
        } catch (MiahootQuestionEmptyException ex) {
            // throw new MiahootQuestionEmptyRestException("Une question no possède pas de
            // réponse", ex);
            throw new MiahootQuestionEmptyRestException(
                    String.format("le miahoot [%s] du user [%s] a une ou plusieurs question(s) vide(s) ou null",
                            miahoot.getNom(), miahoot.getUserId()),
                    miahoot, ex);
        } catch (MiahootEmptyException ex) {
            throw new MiahootEmptyRestException(String.format(
                    "Une erreur lors de la création de l'entité Miahoot à été détecté: le miahoot avec userId = (%s) et nom = (%s)  ne contient pas de questions",
                    miahoot.getUserId(), miahoot.getNom()), miahoot, ex);
        } catch (DuplicationLabelReponsePourUneQuestionException ex) {
            throw new DuplicationLabelReponsePourUneQuestionRestException(String.format(
                    "Une erreur lors de la création de l'entité Miahoot à été détecté: le miahoot avec userId = (%s) et nom = (%s) contient une ou plusieurs questions qui ont 2 réponses identiques",
                    miahoot.getUserId(), miahoot.getNom()));
        } catch (NbReponsesVraiInvalidException ex) {
            throw new NbReponsesVraiInvalidRestException(String.format(
                    "Une erreur lors de la création de l'entité Miahoot à été détecté: le miahoot avec userId = (%s) et nom = (%s) contient une ou plusieurs questions qui n'ont aucune réponse vraie",
                    miahoot.getUserId(), miahoot.getNom()));
        }
        
        
    }

    @Transactional
    public void deleteMiahoot(final String userId, final String nom) {
        try {
            miahootComponent.deleteMiahoot(userId, nom);
        } catch (MiahootEntityNotFoundException ex) {
            throw new MiahootEntityNotFoundRestException(String.format("Impossible de charger l'entité. Raison : [%s]",
                    ex.getMessage()), userId, nom, ex);
        }
    }

    @Transactional
    public void deleteMiahoot(final String userId) {
        try {
            miahootComponent.deleteMiahoot(userId);
        } catch (MiahootListEntityNotFoundException ex) {
            throw new MiahootListEntityNotFoundRestException(
                    String.format("Impossible de charger l'entité. Raison : [%s]",
                            ex.getMessage()),
                    userId, ex);
        }
    }

}