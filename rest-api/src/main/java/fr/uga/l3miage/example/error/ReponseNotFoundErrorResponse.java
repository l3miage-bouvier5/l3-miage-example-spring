package fr.uga.l3miage.example.error;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.jackson.Jacksonized;
import org.springframework.http.HttpStatus;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;

@JsonTypeName(TestNotFoundErrorResponse.TYPE_NAME)
@Getter
@ToString(callSuper = true, exclude = "errorCodeSwaggerDocumentation")
@EqualsAndHashCode(callSuper = true)
public class ReponseNotFoundErrorResponse extends ErrorResponse{
    /**
     * Match {@link ErrorCode#TEST_IS_NOT_FOUND}
     */
    protected static final String TYPE_NAME = "REPONSE_IS_NOT_FOUND";

    @SuppressWarnings({ "java:S115", "java:S1170" }) // Use only to generate documentation
    @Schema(name = "errorCode", description = "Ce code d'erreur est aussi le discriminant pour le polymorphisme", allowableValues = TYPE_NAME,
            implementation = String.class, accessMode = Schema.AccessMode.READ_WRITE)
    @JsonProperty(access = WRITE_ONLY)
    private final String errorCodeSwaggerDocumentation = "Field used only to generate documentation, don't use it";

    @Schema(description = "la description utilisé pour la recherche",example = "description")
    private final String label;



    @Builder
    @Jacksonized
    public ReponseNotFoundErrorResponse(String uri, HttpStatus httpStatus, ErrorCode errorCode, String errorMessage, String label) {
        super(uri, httpStatus, errorCode, errorMessage);
        this.label = label;
    }
}