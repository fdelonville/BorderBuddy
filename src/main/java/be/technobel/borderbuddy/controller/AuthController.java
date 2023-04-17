package be.technobel.borderbuddy.controller;
import be.technobel.borderbuddy.model.dto.AuthDTO;
import be.technobel.borderbuddy.model.form.LoginForm;
import be.technobel.borderbuddy.service.interfaces.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthDTO login(@RequestBody LoginForm form){
        return authService.login(form);
    }

    @GetMapping("/refresh")
    public AuthDTO refreshToken(@RequestHeader("X-Refresh-Token") String refreshToken){
        return authService.refreshJWT(refreshToken);
    }

}
