package be.technobel.borderbuddy.model.form;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginForm {

    @NotBlank
    private final String login;

    @NotBlank
    private final String password;
}
