package br.edu.ufcg.virtus.library.repository;

import br.edu.ufcg.virtus.library.model.Book;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface BookRepository extends PagingAndSortingRepository<Book, Long>, JpaSpecificationExecutor<Book> {
}
