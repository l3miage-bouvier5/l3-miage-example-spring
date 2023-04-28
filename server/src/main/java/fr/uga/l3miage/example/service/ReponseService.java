package fr.uga.l3miage.example.service;

import fr.uga.l3miage.example.component.ReponseComponent;
import fr.uga.l3miage.example.exception.rest.*;
import fr.uga.l3miage.example.exception.technical.*;
import fr.uga.l3miage.example.mapper.ReponseMapper;
import fr.uga.l3miage.example.models.ReponseEntity;
import fr.uga.l3miage.example.request.CreateReponseRequest;
import fr.uga.l3miage.example.response.Reponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class ReponseService {
    private static final String ERROR_DETECTED = "Une erreur lors de la création de l'entité TestConfigWithProperties à été détecté.";
    private final ReponseComponent reponseComponent;
    private final ReponseMapper reponseMapper;



    public Reponse getReponse(final String label) {
        try {
            return reponseMapper.toDto(reponseComponent.getReponse(label));
        } catch (ReponseEntityNotFoundException ex) {
            throw new TestEntityNotFoundRestException(String.format("Impossible de charger l'entité. Raison : [%s]",ex.getMessage()),label,ex);
        }
    }
    public void createReponse(final CreateReponseRequest createReponseRequest) {
        ReponseEntity newReponseEntity = reponseMapper.toEntity(createReponseRequest);
        try{
        reponseComponent.createReponse(newReponseEntity);
            } catch (LabelAlreadyExistException ex) {
                throw new LabelAlreadyUseRestException(ERROR_DETECTED,newReponseEntity.getLabel(),ex);
            }
    }

    public  void updateReponse(final CreateReponseRequest createReponseRequest)  {
        ReponseEntity newReponseEntity = reponseMapper.toEntity(createReponseRequest);
        try {
            reponseComponent.updateReponse(newReponseEntity);
        }  catch (LabelAlreadyExistException ex) {
            throw new LabelAlreadyUseRestException(ERROR_DETECTED,newReponseEntity.getLabel(),ex);
        }  catch (ReponseEntityNotFoundException ex) {
            try {
                throw new ReponseEntityNotFoundException("L'entité n'existe pas dans la base", createReponseRequest.getLabel());
            } catch (ReponseEntityNotFoundException e) {
                throw new RuntimeException(e);
            }
        }
    }


}