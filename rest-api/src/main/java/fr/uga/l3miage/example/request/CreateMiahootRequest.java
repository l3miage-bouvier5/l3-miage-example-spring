package fr.uga.l3miage.example.request;

import fr.uga.l3miage.example.response.Question;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@Schema(description = "Correspond à la requête permettant de créer une entité test")
public class CreateMiahootRequest {

    

    @Schema(description = "correspond au nom de l'objet",example = "qcm ihm")
    private String nom;

    @Schema(description = "correspond aux questions de l'objet", example = "lknn")
    private List<Question> questions;
}
