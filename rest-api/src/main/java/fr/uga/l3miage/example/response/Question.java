package fr.uga.l3miage.example.response;

import java.util.Set;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
@Schema(description = "correspond au DTO de l'entité Question")
public class Question {
    @Schema(description = "correspond à la description de l'objet",example = "cet objet est un test")
    String label;

    @Schema(description = "correspond à l'ensemble de reponses possibles relié à l'objet question",example = "ensemble de réponses possibles pour une question")
    Set<Reponse> reponses;
}
