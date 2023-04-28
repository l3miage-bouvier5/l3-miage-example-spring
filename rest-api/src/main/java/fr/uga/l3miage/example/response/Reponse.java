package fr.uga.l3miage.example.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(description = "correspond au DTO de l'entité Reponse")
public class Reponse {
    @Schema(description = "correspond à la description de l'objet",example = "cet objet est une réponse")
    String label;

    @Schema(description = "Correspond à un boolean quelconque",example = "true")
    Boolean estValide;
}