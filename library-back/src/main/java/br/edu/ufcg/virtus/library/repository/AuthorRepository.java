package br.edu.ufcg.virtus.library.repository;

import br.edu.ufcg.virtus.library.core.repository.BaseRepository;
import br.edu.ufcg.virtus.library.model.Author;

public interface AuthorRepository extends BaseRepository<Author, Long> {
    boolean existsByName(String name);
}
