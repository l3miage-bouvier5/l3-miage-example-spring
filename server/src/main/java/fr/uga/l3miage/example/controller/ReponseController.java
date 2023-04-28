package fr.uga.l3miage.example.controller;

import fr.uga.l3miage.example.endpoint.ReponseEndpoint;
import fr.uga.l3miage.example.exception.rest.IsInErrorRestException;
import fr.uga.l3miage.example.exception.technical.ReponseEntityNotFoundException;
import fr.uga.l3miage.example.models.ReponseEntity;
import fr.uga.l3miage.example.request.CreateReponseRequest;
import fr.uga.l3miage.example.response.Reponse;
import fr.uga.l3miage.example.service.ReponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class ReponseController implements ReponseEndpoint {
    private final ReponseService reponseService;


    /**
     * Dans ce endpoint c'est dans le controller que nous créons la responseEntity, non par un handler
     */

    @Override
    public Reponse getEntityReponse(final String label) {
        return reponseService.getReponse(label);
    }

    @Override
    public void createEntityReponse(final CreateReponseRequest request) {
        reponseService.createReponse(request);
    }

    @Override
    public void updateEntityReponse(final CreateReponseRequest request) {
        reponseService.updateReponse(request);
    }
}
