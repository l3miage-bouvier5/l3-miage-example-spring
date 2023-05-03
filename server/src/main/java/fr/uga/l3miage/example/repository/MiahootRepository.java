package fr.uga.l3miage.example.repository;

import fr.uga.l3miage.example.models.MiahootEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;



@Repository
public interface MiahootRepository extends JpaRepository<MiahootEntity,Long> {

    List<MiahootEntity> findAllByUserId(final String userId);

    List<MiahootEntity> findAllByNom(final String nom);

    Optional<MiahootEntity> findByUserIdAndNom(final String userId, final String nom);

    int deleteByUserIdAndNom(final String userId, final String nom);
}
