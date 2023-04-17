package be.technobel.borderbuddy.service.interfaces;

import be.technobel.borderbuddy.model.dto.AuthDTO;
import be.technobel.borderbuddy.model.form.LoginForm;

public interface AuthService {
    AuthDTO login(LoginForm form);

    AuthDTO refreshJWT(String refreshToken);
}
