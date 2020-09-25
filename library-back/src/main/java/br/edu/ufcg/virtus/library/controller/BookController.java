package br.edu.ufcg.virtus.library.controller;

import br.edu.ufcg.virtus.library.core.dto.PageDTO;
import br.edu.ufcg.virtus.library.core.dto.SearchDTO;
import br.edu.ufcg.virtus.library.dto.BookDTO;
import br.edu.ufcg.virtus.library.exception.BusinessException;
import br.edu.ufcg.virtus.library.model.Book;
import br.edu.ufcg.virtus.library.service.BookService;
import br.edu.ufcg.virtus.library.util.JsonUtil;
import br.edu.ufcg.virtus.library.util.MappingUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

@RestController
@RequestMapping("books")
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws BusinessException {
        this.service.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<BookDTO> update(@PathVariable Long id, @RequestBody BookDTO newBookDTO) throws BusinessException {
        Book newBook = MappingUtil.mapTo(newBookDTO, Book.class);
        return ResponseEntity.ok(MappingUtil.mapTo(service.update(newBook, id), BookDTO.class));
    }

    @PatchMapping(path = "/{id}")
    public ResponseEntity<BookDTO> patch(@PathVariable Long id, @RequestBody BookDTO newBookDTO) throws BusinessException {
        Book newBook = MappingUtil.mapTo(newBookDTO, Book.class);
        return ResponseEntity.ok(MappingUtil.mapTo(service.patch(newBook, id), BookDTO.class));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<BookDTO> getOne(@PathVariable("id") Long id) throws BusinessException {
        return ResponseEntity.ok(MappingUtil.mapTo(service.getOne(id), BookDTO.class));
    }

    @PostMapping
    public ResponseEntity<BookDTO> insert(@RequestBody BookDTO bookDTO) throws BusinessException {
        Book model = service.insert(MappingUtil.mapTo(bookDTO, Book.class));
        return ResponseEntity.status(HttpStatus.CREATED).body(MappingUtil.mapTo(model, BookDTO.class));
    }

    @GetMapping
    public ResponseEntity<PageDTO> listAll(HttpServletRequest request, @PathParam("filters") String filters) throws BusinessException {
        SearchDTO searchDTO = new SearchDTO();
        if (filters != null) {
            searchDTO = JsonUtil.fromJson(filters, SearchDTO.class);
        }
        PageDTO page = MappingUtil.mapPageItems(service.findPaginated(searchDTO), BookDTO.class);
        return ResponseEntity.ok(page);
    }

}
