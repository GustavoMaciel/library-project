package br.edu.ufcg.virtus.library.service;

import br.edu.ufcg.virtus.library.core.dto.PageDTO;
import br.edu.ufcg.virtus.library.core.dto.SearchDTO;
import br.edu.ufcg.virtus.library.exception.BusinessException;
import br.edu.ufcg.virtus.library.model.Author;
import br.edu.ufcg.virtus.library.model.Book;
import br.edu.ufcg.virtus.library.repository.BookRepository;
import br.edu.ufcg.virtus.library.util.BeanUtils;
import br.edu.ufcg.virtus.library.util.TranslatorUtil;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class BookService {

    private final BookRepository repository;
    private final AuthorService authorService;

    public BookService(BookRepository repository, @Lazy AuthorService authorService) {
        this.repository = repository;
        this.authorService = authorService;
    }

    @Transactional(readOnly = true)
    public Book getOne(Long id) throws BusinessException {
        return repository.findById(id).orElseThrow(() -> new BusinessException(TranslatorUtil.ITEM_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public List<Book> findAll() {
        return StreamSupport.stream(repository.findAll().spliterator(), false).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PageDTO findPaginated(SearchDTO searchDTO) {
        Pageable pageable = createPageRequest(searchDTO);
        Page<Book> jpaPage = repository.findAll(pageable);
        return pageDTOFromJPAPage(jpaPage);
    }

    @Transactional
    public void delete(Long id) throws BusinessException {
        Book model = repository.findById(id).orElseThrow(() -> new BusinessException(TranslatorUtil.ITEM_NOT_FOUND));
        repository.delete(model);
    }

    @Transactional
    public void delete(Long[] ids) throws BusinessException {
        for (Long id: ids) {
            this.delete(id);
        }
    }

    private void validateInsert(Book model) throws BusinessException {
        Date currentDate = new Date();
        if (model.getPublicationDate().after(currentDate)) {
            throw new BusinessException("book.publicationDate.invalid");
        }
    }

    @Transactional
    public void preInsert(Book model) throws BusinessException {
        if (model.getAuthors() != null) {
            for(Author author: model.getAuthors()) {
                if (author.getId() == null) {
                    authorService.insert(author);
                }
            }
        }
    }

    @Transactional
    public Book insert(Book model) throws BusinessException {
        this.validateInsert(model);
        this.preInsert(model);
        return repository.save(model);
    }

    private void validateUpdate(Book model, Long id) throws BusinessException {
        Book dbModel = repository.findById(id).orElseThrow(() -> new BusinessException(TranslatorUtil.ITEM_NOT_FOUND));
        if (!dbModel.getPublicationDate().equals(model.getPublicationDate())) {
            throw new BusinessException("book.publicationDate.immutable");
        }
    }

    @Transactional
    public Book update(Book newModel, Long id) throws BusinessException {
        this.validateUpdate(newModel, id);
        return update(newModel, id, false);
    }

    @Transactional
    public Book patch(Book newModel, Long id) throws BusinessException {
        return update(newModel, id, true);
    }

    private Book update(Book newModel, Long id, boolean isPatch) throws BusinessException {
        Book dbModel = repository.findById(id).orElseThrow(() -> new BusinessException(TranslatorUtil.ITEM_NOT_FOUND));
        if(!dbModel.getId().equals(newModel.getId())) {
            throw new BusinessException(TranslatorUtil.ITEM_UPDATE_INCONSISTENT);
        }
        if(isPatch) {
            BeanUtils.copyNonNullProperties(dbModel, newModel);
        } else {
            BeanUtils.copyAllProperties(newModel, dbModel);
        }
        return repository.save(dbModel);
    }

    private PageDTO pageDTOFromJPAPage(Page<Book> jpaPage) {
        PageDTO page = new PageDTO();
        page.setItems(jpaPage.getContent());
        page.setCurrentPage(jpaPage.getPageable().getPageNumber());
        page.setPageSize(jpaPage.getPageable().getPageSize());
        page.setTotalPages(jpaPage.getTotalPages());
        page.setTotalRecords(jpaPage.getTotalElements());
        return page;
    }

    private Pageable createPageRequest(SearchDTO searchDTO) {
        if(searchDTO.getSort().getColumns() == null) {
            return PageRequest.of(searchDTO.getCurrentPage(), searchDTO.getPageSize());
        }
        String[] columns = searchDTO.getSort().getColumns().replace(" ", "").split(",");
        return PageRequest.of(searchDTO.getCurrentPage(), searchDTO.getPageSize(),
                Sort.Direction.fromString(searchDTO.getSort().getOrder()), columns);
    }
}
