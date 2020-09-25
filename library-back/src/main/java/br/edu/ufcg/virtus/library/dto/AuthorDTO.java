package br.edu.ufcg.virtus.library.dto;

import br.edu.ufcg.virtus.library.dto.simple.BookSimpleDTO;

import java.util.List;

public class AuthorDTO {
    private Long id;
    private String name;
    private List<BookSimpleDTO> books;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<BookSimpleDTO> getBooks() {
        return books;
    }

    public void setBooks(List<BookSimpleDTO> books) {
        this.books = books;
    }
}
