package br.edu.ufcg.virtus.library.util;

import br.edu.ufcg.virtus.library.core.dto.PageDTO;
import br.edu.ufcg.virtus.library.exception.BusinessException;
import org.modelmapper.ModelMapper;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

/**
 * Object Mapping Utilities
 */
public class MappingUtil {

    /**
     * Empty Constructor
     */
    private MappingUtil() {
        // SonarLint
    }

    /**
     * Model Mapper instance
     * @see ModelMapper
     */
    private static final ModelMapper modelMapper = new ModelMapper();

    /**
     * Map an object instance to another class
     * @param source object to be mapped
     * @param destination class to be mapped
     * @param <D> class to be mapped
     * @return mapped source
     * @throws BusinessException thrown if an exception occurs while mapping the object
     */
    public static <D> D mapTo(Object source, Type destination) throws BusinessException {
        try {
            return modelMapper.map(source, destination);
        } catch (Exception ex) {
            throw new BusinessException("unexpected.error", ex);
        }
    }

    /**
     * Map an all instances in a list to another class
     * @param sourceList list o objects to be mapped
     * @param destination class to be mapped
     * @param <D> class to be mapped
     * @return list of the mapped sources
     * @throws BusinessException thrown if an exception occurs while mapping the objects
     */
    public static <D, S> List<D> mapToList(List<S> sourceList, Type destination) throws BusinessException {
        List<D> list = new ArrayList<>();
        for(S source: sourceList) {
            list.add(mapTo(source, destination));
        }
        return list;
    }

    /**
     * Map all objects instance in a {@link PageDTO} to another class
     * @param page Page of objects to be mapped
     * @param destination class to be mapped
     * @return mapped PageDTO
     * @throws BusinessException thrown if an exception occurs while mapping the objects
     */
    public static PageDTO mapPageItems(PageDTO page, Type destination) throws BusinessException {
        page.setItems(mapToList(page.getItems(), destination));
        return page;
    }
}
