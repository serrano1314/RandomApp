package tgsi.randomapp.backend.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
public class InvalidFieldException extends RuntimeException {

    private static final Long serialVersionUID = 1L;

    @Getter
    @Setter
    private String message;

}
