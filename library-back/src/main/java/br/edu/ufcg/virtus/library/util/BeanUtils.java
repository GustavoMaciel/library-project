package br.edu.ufcg.virtus.library.util;

import org.apache.commons.beanutils.BeanUtilsBean;

import java.lang.reflect.InvocationTargetException;

/**
 * BeanUtils to copy properties and ignore null
 */
public class BeanUtils extends BeanUtilsBean {

    /**
     * BeanUtils Instance
     */
    private static final br.edu.ufcg.virtus.library.util.BeanUtils INSTANCE = new br.edu.ufcg.virtus.library.util.BeanUtils();

    /**
     * Copy ignoring null properties
     * @param target Target Object
     * @param source Source Object
     */
    public static void copyNonNullProperties(Object target, Object source) {
        try {
            INSTANCE.copyProperties(target, source);
        } catch (IllegalAccessException | InvocationTargetException e) {
            throw new RuntimeException("unexpected.error", e);
        }
    }

    /**
     * Copy all properties
     * @param target Target Object
     * @param source Source Object
     */
    public static void copyAllProperties(Object target, Object source) {
        org.springframework.beans.BeanUtils.copyProperties(target, source);
    }

    /**
     * (non-javadoc)
     * @see BeanUtilsBean#copyProperty(Object, String, Object)
     */
    @Override
    public void copyProperty(Object bean, String name, Object value) throws IllegalAccessException, InvocationTargetException {
        if(value == null) return;
        super.copyProperty(bean, name, value);
    }
}
