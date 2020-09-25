package br.edu.ufcg.virtus.library.core.dto;

public class SearchDTO {
    private SortDTO sort = new SortDTO();
    private String search = "";
    private Integer pageSize = 10;
    private Integer currentPage = 0;

    public SortDTO getSort() {
        return sort;
    }

    public void setSort(SortDTO sort) {
        this.sort = sort;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(Integer currentPage) {
        this.currentPage = currentPage;
    }
}
