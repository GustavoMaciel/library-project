package br.edu.ufcg.virtus.library.repository;

import br.edu.ufcg.virtus.library.model.Author;
import br.edu.ufcg.virtus.library.model.AuthorBook;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AuthorBookRepository extends PagingAndSortingRepository<AuthorBook, Long>, JpaSpecificationExecutor<Author> {
}
