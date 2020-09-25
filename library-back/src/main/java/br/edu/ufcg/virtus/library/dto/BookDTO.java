package br.edu.ufcg.virtus.library.dto;

import br.edu.ufcg.virtus.library.dto.simple.AuthorSimpleDTO;

import java.util.Date;
import java.util.List;

public class BookDTO {
    private Long id;
    private String name;
    private String synopsis;
    private Date publicationDate;
    private List<AuthorSimpleDTO> authors;

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

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }

    public List<AuthorSimpleDTO> getAuthors() {
        return authors;
    }

    public void setAuthors(List<AuthorSimpleDTO> authors) {
        this.authors = authors;
    }
}
