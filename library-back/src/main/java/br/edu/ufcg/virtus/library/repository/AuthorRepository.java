package br.edu.ufcg.virtus.library.repository;

import br.edu.ufcg.virtus.library.model.Author;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AuthorRepository extends PagingAndSortingRepository<Author, Integer>, JpaSpecificationExecutor<Author> {
}
