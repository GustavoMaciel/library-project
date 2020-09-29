package br.edu.ufcg.virtus.library.service;

import br.edu.ufcg.virtus.library.core.dto.PageDTO;
import br.edu.ufcg.virtus.library.core.dto.SearchDTO;
import br.edu.ufcg.virtus.library.exception.BusinessException;
import br.edu.ufcg.virtus.library.model.Author;
import br.edu.ufcg.virtus.library.model.Book;
import br.edu.ufcg.virtus.library.repository.AuthorRepository;
import br.edu.ufcg.virtus.library.util.BeanUtils;
import br.edu.ufcg.virtus.library.util.TranslatorUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class AuthorService {

    private final AuthorRepository repository;
    private final BookService bookService;

    public AuthorService(AuthorRepository repository, BookService bookService) {
        this.repository = repository;
        this.bookService = bookService;
    }

    @Transactional(readOnly = true)
    public Author getOne(Long id) throws BusinessException {
        return repository.findById(id).orElseThrow(() -> new BusinessException(TranslatorUtil.ITEM_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public List<Author> findAll() {
        return StreamSupport.stream(repository.findAll().spliterator(), false).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PageDTO findPaginated(SearchDTO searchDTO) {
        Pageable pageable = createPageRequest(searchDTO);
        Page<Author> jpaPage = repository.findAll(pageable);
        return pageDTOFromJPAPage(jpaPage);
    }

    @Transactional
    public void delete(Long id) throws BusinessException {
        Author model = repository.findById(id).orElseThrow(() -> new BusinessException(TranslatorUtil.ITEM_NOT_FOUND));
        repository.delete(model);
    }

    @Transactional
    public void delete(Long[] ids) throws BusinessException {
        for (Long id: ids) {
            this.delete(id);
        }
    }

    private void validateInsert(Author model) throws BusinessException {
        // SonarLint
        if (repository.existsByName(model.getName())) {
            throw new BusinessException("author.name.exists");
        }
    }

    @Transactional
    public void preInsert(Author model) throws BusinessException {
        if (model.getBooks() != null) {
            for(Book book: model.getBooks()) {
                if (book.getId() == null) {
                    bookService.insert(book);
                }
            }
        }
    }

    @Transactional
    public Author insert(Author model) throws BusinessException {
        this.validateInsert(model);
        preInsert(model);
        return repository.save(model);
    }

    private void validateUpdate(Author model, Long id) throws BusinessException {
        Author dbModel = this.repository.findById(id).orElseThrow(() -> new BusinessException(TranslatorUtil.ITEM_NOT_FOUND));
        if (!dbModel.getName().equals(model.getName()) && repository.existsByName(model.getName())) {
            throw new BusinessException("author.name.exists");
        }

    }

    @Transactional
    public Author update(Author newModel, Long id) throws BusinessException {
        this.validateUpdate(newModel, id);
        return update(newModel, id, false);
    }

    @Transactional
    public Author patch(Author newModel, Long id) throws BusinessException {
        return update(newModel, id, true);
    }

    private Author update(Author newModel, Long id, boolean isPatch) throws BusinessException {
        Author dbModel = repository.findById(id).orElseThrow(() -> new BusinessException(TranslatorUtil.ITEM_NOT_FOUND));
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

    private PageDTO pageDTOFromJPAPage(Page<Author> jpaPage) {
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
