package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.models.QuestionEntity;
import fr.uga.l3miage.example.models.TestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Les annotations :
 * <ul>
 *     <li>{@link Repository} permet de dire à spring que cette interface peut être candidate à l'injection</li>
 * </ul>
 */
@Repository
public interface QuestionRepository extends JpaRepository<QuestionEntity, Long> {
    /**
     * En JPA le nom de la méthode est parsé afin de créer la requête adéquate en fonction de votre besoin
     * ici pour chercher une entité
     * @param label de l'entité recherchée
     * @return {@link Optional}<{@link TestEntity}>
     */
    Optional<QuestionEntity> findByLabel(final String label);


    /**
     * En JPA le nom de la méthode est parsé afin de créer la requête adéquate en fonction de votre besoin
     * Ici pour delete une entité
     * @param label de l'entité à supprimer
     * @return le nombre d'éléments supprimés
     */
    int deleteByLabel(final String label);
}