package fr.uga.l3miage.example.mapper;

import fr.uga.l3miage.example.models.ReponseEntity;
import fr.uga.l3miage.example.request.CreateReponseRequest;
import fr.uga.l3miage.example.response.Reponse;
import lombok.NonNull;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

//kTest
@Mapper
public interface ReponseMapper {

    Reponse toDto(ReponseEntity reponseEntity);

    ReponseEntity toEntity(CreateReponseRequest request);


    // pas sure qu'on en aie besoin
    void mergeReponseEntity(@MappingTarget @NonNull ReponseEntity baseEntity, ReponseEntity reponse);


}