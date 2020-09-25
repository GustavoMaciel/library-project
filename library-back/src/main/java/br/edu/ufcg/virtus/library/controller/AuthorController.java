package br.edu.ufcg.virtus.library.controller;

import br.edu.ufcg.virtus.library.core.dto.PageDTO;
import br.edu.ufcg.virtus.library.core.dto.SearchDTO;
import br.edu.ufcg.virtus.library.dto.AuthorDTO;
import br.edu.ufcg.virtus.library.exception.BusinessException;
import br.edu.ufcg.virtus.library.model.Author;
import br.edu.ufcg.virtus.library.service.AuthorService;
import br.edu.ufcg.virtus.library.util.JsonUtil;
import br.edu.ufcg.virtus.library.util.MappingUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

@RestController
@RequestMapping("authors")
public class AuthorController {

    private final AuthorService service;

    public AuthorController(AuthorService service) {
        this.service = service;
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws BusinessException {
        this.service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<AuthorDTO> update(@PathVariable Long id, @RequestBody AuthorDTO newAuthorDTO) throws BusinessException {
        Author newAuthor = MappingUtil.mapTo(newAuthorDTO, Author.class);
        return ResponseEntity.ok(MappingUtil.mapTo(service.update(newAuthor, id), AuthorDTO.class));
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<AuthorDTO> patch(@PathVariable Long id, @RequestBody AuthorDTO newAuthorDTO) throws BusinessException {
        Author newAuthor = MappingUtil.mapTo(newAuthorDTO, Author.class);
        return ResponseEntity.ok(MappingUtil.mapTo(service.patch(newAuthor, id), AuthorDTO.class));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<AuthorDTO> getOne(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(MappingUtil.mapTo(service.getOne(id), AuthorDTO.class));
    }

    @PostMapping
    public ResponseEntity<AuthorDTO> insert(@RequestBody AuthorDTO bookDTO) throws BusinessException {
        Author model = service.insert(MappingUtil.mapTo(bookDTO, Author.class));
        return ResponseEntity.status(HttpStatus.CREATED).body(MappingUtil.mapTo(model, AuthorDTO.class));
    }

    @GetMapping
    public ResponseEntity<PageDTO> listAll(HttpServletRequest request, @PathParam("filters") String filters) throws BusinessException {
        SearchDTO searchDTO = new SearchDTO();
        if (filters != null) {
            searchDTO = JsonUtil.fromJson(filters, SearchDTO.class);
        }
        PageDTO page = MappingUtil.mapPageItems(service.findPaginated(searchDTO), AuthorDTO.class);
        return ResponseEntity.ok(page);
    }

}
