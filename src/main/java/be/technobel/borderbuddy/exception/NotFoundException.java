package be.technobel.borderbuddy.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class NotFoundException extends ResponseStatusException {
    public NotFoundException(){
        super(HttpStatus.NOT_FOUND,"No matching element found in database ");
    }
}
