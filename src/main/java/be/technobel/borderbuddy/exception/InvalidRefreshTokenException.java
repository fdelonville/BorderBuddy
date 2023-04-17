package be.technobel.borderbuddy.exception;

import lombok.Getter;

@Getter
public class InvalidRefreshTokenException extends RuntimeException{

    private final String refreshToken;

    public InvalidRefreshTokenException(String refreshToken) {
        super("invalid refresh token");
        this.refreshToken = refreshToken;
    }
}
