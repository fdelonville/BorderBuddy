package be.technobel.borderbuddy.model.form;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginForm {

    @NotBlank
    private String login;

    @NotBlank
    private String password;
}
