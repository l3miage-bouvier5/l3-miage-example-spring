package fr.uga.l3miage.example.endpoint;

import fr.uga.l3miage.example.annotations.Error400Custom;
import fr.uga.l3miage.example.error.ReponseNotFoundErrorResponse;
import fr.uga.l3miage.example.error.TestNotFoundErrorResponse;
import fr.uga.l3miage.example.request.CreateReponseRequest;
import fr.uga.l3miage.example.response.Reponse;
import fr.uga.l3miage.example.response.Test;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;



@Tag(name = "Reponse tag")
@CrossOrigin
@RestController
@RequestMapping("reponse/")
public interface ReponseEndpoint {
    // GET

    @Operation(description = "Récupérer le DTO de l'entité Reponse qui a pour id celui passé en paramètre")
    @ApiResponse(responseCode = "200", description = "Renvoie le DTO de l'entité reponse demandée",
            content = @Content(schema = @Schema(implementation = Reponse.class),mediaType = MediaType.APPLICATION_JSON_VALUE))
    @ApiResponse(responseCode = "404", description = "Renvoie une erreur 404 si l'entité n'est pas trouvée",
            content = @Content(schema = @Schema(implementation = ReponseNotFoundErrorResponse.class),mediaType = MediaType.APPLICATION_JSON_VALUE))
    @ResponseStatus(HttpStatus.OK)
    @GetMapping("{label}")
    Reponse getEntityReponse(@PathVariable String label);


   //POST
    @Operation(description = "Création d'une entité Reponse")
    @ApiResponse(responseCode = "201", description = "L'entité Reponse a bien été créée.",
            content = @Content(schema = @Schema(implementation = Reponse.class),mediaType = MediaType.APPLICATION_JSON_VALUE))
    @ApiResponse(responseCode = "409", description = "L'entité Reponse existe déjà.",
            content = @Content(schema = @Schema(implementation = ReponseNotFoundErrorResponse.class),mediaType = MediaType.APPLICATION_JSON_VALUE))
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    void createEntityReponse(@Valid @RequestBody CreateReponseRequest request);

    //UPDATE
    @Operation(description = "Mise à jour d'une entité reponse")
    @ApiResponse(responseCode = "202", description = "L'entité à bien été mis à jour")
    @ApiResponse(responseCode = "404", description = "Renvoie une erreur 404 si l'entité n'est pas trouvée",
            content = @Content(schema = @Schema(implementation = TestNotFoundErrorResponse.class),mediaType = MediaType.APPLICATION_JSON_VALUE))
    @Error400Custom
    @ResponseStatus(HttpStatus.ACCEPTED)
    @PatchMapping("{label}")
    void updateEntityReponse(@Valid @RequestBody CreateReponseRequest request);

}