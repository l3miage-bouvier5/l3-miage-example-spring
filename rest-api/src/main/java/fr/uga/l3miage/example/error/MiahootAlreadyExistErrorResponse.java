package fr.uga.l3miage.example.error;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;

import fr.uga.l3miage.example.request.CreateMiahootRequest;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.jackson.Jacksonized;
import org.springframework.http.HttpStatus;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;
/**
 * Cette classe correspond à l'erreur renvoyée au client lorsqu'une description est déjà utilisée sur une autre entité, lors de la création ou l'update d'une entité<br>
 * Elle hérite de la classe {@link ErrorResponse} afin de permettre du polymorphisme.<br>
 *
 * Les annotations :
 * <ul>
 *     <li>{@link JsonTypeName} permet de donner l'id du sous type d'une {@link ErrorResponse} pour pouvoir désérialiser la bonne erreurs.</li>
 *     <li>{@link EqualsAndHashCode} permet de redéfinir la fonction <u>equals</u> et <u>hashCode</u>. Voir la doc <a href="https://projectlombok.org/features/EqualsAndHashCode">projetlombok.org/features/EqualsHashCode</a></li>
 *     <li>{@link Getter} permet de créer tout les getters de tous les attribues. Voir la doc <a href="https://projectlombok.org/features/GetterSetter">projetlombok.org/features/Getter</a></li>
 *     <li>{@link ToString} permet de redéfinir la fonction <u>toString</u> avec tous les champs de l'objet. Voir la  doc <a href="https://projectlombok.org/features/ToString">projetlombok.org/features/toString</a></li>
 * </ul>
 */
@JsonTypeName(MiahootAlreadyExistErrorResponse.TYPE_NAME)
@Getter
@ToString(callSuper = true, exclude = "errorCodeSwaggerDocumentation")
@EqualsAndHashCode(callSuper = true)
public class MiahootAlreadyExistErrorResponse extends ErrorResponse{
    protected static final String TYPE_NAME = " MIAHOOT_ALREADY_EXISTS";

    @Schema(name = "errorCode", description = "Ce code d'erreur est aussi le discriminant pour le polymorphisme", allowableValues = TYPE_NAME,
            implementation = String.class, accessMode = Schema.AccessMode.READ_WRITE)
    @JsonProperty(access = WRITE_ONLY)
    private final String errorCodeSwaggerDocumentation = "Field used only to generate documentation, don't use it";

    @Schema(description = "le label utilisé pour la recherche",example = "donner une réponse ?")
    private final CreateMiahootRequest request;

    @Builder
    @Jacksonized
    public MiahootAlreadyExistErrorResponse(String uri, HttpStatus httpStatus, ErrorCode errorCode, String errorMessage, CreateMiahootRequest request) {
        super(uri, httpStatus, errorCode, errorMessage);
        this.request = request;
    }
}
