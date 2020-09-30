package br.edu.ufcg.virtus.library.dto;

import br.edu.ufcg.virtus.library.dto.simple.AuthorSimpleDTO;
import br.edu.ufcg.virtus.library.dto.simple.BookSimpleDTO;

public class AuthorBookDTO {
    private Long id;
    private AuthorSimpleDTO author;
    private BookSimpleDTO book;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AuthorSimpleDTO getAuthor() {
        return author;
    }

    public void setAuthor(AuthorSimpleDTO author) {
        this.author = author;
    }

    public BookSimpleDTO getBook() {
        return book;
    }

    public void setBook(BookSimpleDTO book) {
        this.book = book;
    }
}
