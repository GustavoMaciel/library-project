package br.edu.ufcg.virtus.library.core.config;

import br.edu.ufcg.virtus.library.core.dto.RestMessageDTO;
import br.edu.ufcg.virtus.library.exception.BusinessException;
import br.edu.ufcg.virtus.library.util.TranslatorUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(BusinessException.class)
    public final ResponseEntity<RestMessageDTO> handleBusinessException(BusinessException ex, WebRequest request) {
        RestMessageDTO dto = new RestMessageDTO(ex.getMessage());
        dto.setCode(ex.getCode());
        return ResponseEntity.status(ex.getStatus()).body(dto);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<RestMessageDTO> handleException(Exception ex) {
        RestMessageDTO dto = new RestMessageDTO(ex.getMessage());
        dto.setCode(TranslatorUtil.UNEXPECTED_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(dto);
    }

}
