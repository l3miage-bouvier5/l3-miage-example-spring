package fr.uga.l3miage.example.component;

import fr.uga.l3miage.example.exception.technical.*;
import fr.uga.l3miage.example.mapper.ReponseMapper;
import fr.uga.l3miage.example.models.ReponseEntity;
import fr.uga.l3miage.example.repository.ReponseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class ReponseComponent {
    private final ReponseRepository reponseRepository;
    private final ReponseMapper reponseMapper;

    public ReponseEntity getReponse(final String label) throws ReponseEntityNotFoundException {
        return reponseRepository.findByLabel(label)
                .orElseThrow(() -> new ReponseEntityNotFoundException(
                        String.format("Aucune entité n'a été trouvée pour le label [%s]", label), label));
    }

    public void createReponse(final ReponseEntity entity) throws LabelAlreadyExistException {
        if (reponseRepository.findByLabel(entity.getLabel()).isPresent()) {
            throw new LabelAlreadyExistException(String.format("Le label %s existe déjà en BD.", entity.getLabel()),
                    entity.getLabel());
        }
        reponseRepository.save(entity);
    }

    public void updateReponse(final ReponseEntity entity)
            throws LabelAlreadyExistException, ReponseEntityNotFoundException {
        if (reponseRepository.findByLabel(entity.getLabel()).isPresent()) {
            Optional<ReponseEntity> lastEntity = reponseRepository.findByLabel(entity.getLabel());
            if (lastEntity.get().getEstValide().equals(entity.getEstValide())) {
                throw new LabelAlreadyExistException(String.format("Le label %s existe déjà en BD.", entity.getLabel()),
                        entity.getLabel());
            } else {
                reponseMapper.mergeReponseEntity(entity, lastEntity.get());
                reponseRepository.save(entity);
            }
        } else {
            throw new ReponseEntityNotFoundException(
                    String.format("Aucune entité n'a été trouvée pour le label [%s]", entity.getLabel()),
                    entity.getLabel());
        }
    }
}