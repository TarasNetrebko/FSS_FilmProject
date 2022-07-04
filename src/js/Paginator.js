/**
 * Pagination
 */
export default class Paginator {

    /**
     *
     * @param page
     * @param pageSize
     * @param dataLength
     */
    constructor(page, pageSize, dataLength) {
        this.page = page;
        this.pageSize = pageSize;
        this.dataLength = dataLength;

        this.divPagination = document.querySelector('.pagination');
    }

    static getCurrentPage() {
        const params = new URLSearchParams(window.location.search);

        return params.get('page') ? parseInt(params.get('page')) : 1;
        // parseInt(params.get('page')) ?? 1;
    }

    /**
     * Count pages
     * @returns {number}
     */
    get pageCount() {
        return Math.ceil(this.dataLength / this.pageSize);
    }

    getDotPage(start, end) {
        return Math.ceil((start + end) / 2)
    }

    getPrevPage(page) {
        return page - 1;
    }

    render() {

        const lastPage = this.pageCount;

        const prevPage = (this.page - 2) > 0 ? (this.page - 2) : 1;


        const nextPage = (this.page + 2 > lastPage) ? lastPage : (this.page + 2);

        this.divPagination.insertAdjacentHTML('beforeend', this.getBtnPrev());

        if (this.page > 3) {
            this.divPagination.insertAdjacentHTML('beforeend', this.getBtnOne());
        }


        if (5 <= this.page) {
            this.divPagination.insertAdjacentHTML('beforeend', this.getBtnDot(this.getDotPage(1, prevPage)));

        }
        if (2 <= this.page <= (lastPage - 1)) {

            for (let i = prevPage; i <= nextPage; i++) {

                if (i === this.page) {
                    this.divPagination.insertAdjacentHTML('beforeend', this.getBtnActive(i));
                } else {
                    this.divPagination.insertAdjacentHTML('beforeend', this.getBtnDefault(i));

                }
            }

        }

        if (this.page < (lastPage - 4)) {
            this.divPagination.insertAdjacentHTML('beforeend', this.getBtnDot(this.getDotPage(nextPage, lastPage)));
        }

        if (this.page < (lastPage - 2)) {
            this.divPagination.insertAdjacentHTML('beforeend', this.getBtnLast(this.pageCount));
        }


        this.divPagination.insertAdjacentHTML('beforeend', this.getBtnNext());




    }

    getBtnDefault(currentPage) {
        return `<li class="pagination__button" >
        <a class="pagination__button-link" href="?page=${currentPage}">${currentPage}</a>
    </li>`;

    }

    getBtnOne() {
        const displayNoneClass = this.page !== 1 ? ' pagination__button--none' : '';
        return `<li class="pagination__button ${displayNoneClass}" >
        <a class="pagination__button-link" href="?page=1">1</a>
    </li>`;
    }

    getBtnLast() {
        const displayNoneClass = this.page !== this.pageCount ? ' pagination__button--none' : '';
        return `<li class="pagination__button ${displayNoneClass}" >
        <a class="pagination__button-link" href="?page=${this.pageCount}">${this.pageCount}</a>
    </li>`;
    }

    getBtnActive() {
        return `  <li class="pagination__button pagination__active-btn">${this.page}</li>`;
    }

    getBtnNext() {

        const disabledClass = this.page === this.pageCount ? ' pagination__button--disabled' : '';
        const nextPage = this.page + 1;


        return ` <li class="pagination__button ${disabledClass} pagination__arrow-btn--right" >
        <a class="pagination__button-link" href="?page=${nextPage}">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33341 8H12.6667" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8.00008 12.6668L12.6667 8.00016L8.00008 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>

      </li>`;
    }

    getBtnPrev() {

        const disabledClass = this.page <= 1 ? ' pagination__button--disabled' : '';
        const prevPage = this.page - 1;
        return `  <li class="pagination__button pagination__arrow-btn--left ${disabledClass}">
        <a class="pagination__button-link" href="?page=${prevPage}">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6667 8H3.33337" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.00004 12.6668L3.33337 8.00016L8.00004 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
      </li>`;
    }

    getBtnDot(page) {
        return `<li class="pagination__button pagination__button-dots">
        <a class="pagination__button-link " href="?page=${page}">...</a>
      </li>`;
    }




}









