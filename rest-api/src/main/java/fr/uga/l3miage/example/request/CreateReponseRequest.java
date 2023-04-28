package fr.uga.l3miage.example.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@Schema(description = "Correspond à la requête permettant de créer une entité Reponse")
public class CreateReponseRequest {

    @Schema(description = "correspond à la description de l'objet",example = "cet objet est une réponse")
    String label;

    @Schema(description = "Correspond à un boolean quelconque",example = "true")
    Boolean estValide;
}