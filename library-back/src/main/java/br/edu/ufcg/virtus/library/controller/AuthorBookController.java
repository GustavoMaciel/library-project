package br.edu.ufcg.virtus.library.controller;

import br.edu.ufcg.virtus.library.core.dto.PageDTO;
import br.edu.ufcg.virtus.library.core.dto.SearchDTO;
import br.edu.ufcg.virtus.library.dto.AuthorBookDTO;
import br.edu.ufcg.virtus.library.exception.BusinessException;
import br.edu.ufcg.virtus.library.model.AuthorBook;
import br.edu.ufcg.virtus.library.service.AuthorBookService;
import br.edu.ufcg.virtus.library.util.JsonUtil;
import br.edu.ufcg.virtus.library.util.MappingUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

@RestController
@RequestMapping("author-book-associations")
public class AuthorBookController {

    private final AuthorBookService service;

    public AuthorBookController(AuthorBookService service) {
        this.service = service;
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws BusinessException {
        this.service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<AuthorBookDTO> update(@PathVariable Long id, @RequestBody AuthorBookDTO newAuthorDTO) throws BusinessException {
        AuthorBook newAuthor = MappingUtil.mapTo(newAuthorDTO, AuthorBook.class);
        return ResponseEntity.ok(MappingUtil.mapTo(service.update(newAuthor, id), AuthorBookDTO.class));
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<AuthorBookDTO> patch(@PathVariable Long id, @RequestBody AuthorBookDTO newAuthorDTO) throws BusinessException {
        AuthorBook newAuthor = MappingUtil.mapTo(newAuthorDTO, AuthorBook.class);
        return ResponseEntity.ok(MappingUtil.mapTo(service.patch(newAuthor, id), AuthorBookDTO.class));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<AuthorBookDTO> getOne(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(MappingUtil.mapTo(service.getOne(id), AuthorBookDTO.class));
    }

    @PostMapping
    public ResponseEntity<AuthorBookDTO> insert(@RequestBody AuthorBookDTO bookDTO) throws BusinessException {
        AuthorBook model = service.insert(MappingUtil.mapTo(bookDTO, AuthorBook.class));
        return ResponseEntity.status(HttpStatus.CREATED).body(MappingUtil.mapTo(model, AuthorBookDTO.class));
    }

    @GetMapping
    public ResponseEntity<PageDTO> listAll(HttpServletRequest request, @PathParam("filters") String filters) throws BusinessException {
        SearchDTO searchDTO = new SearchDTO();
        if (filters != null) {
            searchDTO = JsonUtil.fromJson(filters, SearchDTO.class);
        }
        PageDTO page = MappingUtil.mapPageItems(service.findPaginated(searchDTO), AuthorBookDTO.class);
        return ResponseEntity.ok(page);
    }

}
