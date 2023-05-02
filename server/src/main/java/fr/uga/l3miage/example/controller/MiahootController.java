package fr.uga.l3miage.example.controller;

import fr.uga.l3miage.example.endpoint.MiahootEndpoint;
import fr.uga.l3miage.example.request.CreateMiahootRequest;
import fr.uga.l3miage.example.response.Miahoot;
import fr.uga.l3miage.example.service.MiahootService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MiahootController implements MiahootEndpoint {

    private final MiahootService miahootService;

    @Override
    public Miahoot getEntityMiahoot(final String userId, final String nom) {
        return miahootService.getMiahoot(userId, nom);
    }

    @Override
    public List<Miahoot> getEntityMiahoot(final String userId) {
        return miahootService.getMiahoot(userId);
    }

    @Override
    public void createEntityMiahoot(final CreateMiahootRequest request) {
        miahootService.createMiahoot(request);
    }


    public void updateMiahootEntity(final String userId, final String nom, final Miahoot miahoot) {
        miahootService.updateMiahoot(userId,nom,miahoot);
    }

    @Override
    public void deleteMiahootEntity(final String userId, final String nom) {
        miahootService.deleteMiahoot(userId, nom);
    }

    @Override
    public void deleteMiahootEntity(final String userId) {
        miahootService.deleteMiahoot(userId);
    }


}
