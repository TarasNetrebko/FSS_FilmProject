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
        this.initEvents();
    }

    initEvents() {
        if (!window.calledOnce) {
            window.calledOnce = true;
            this.divPagination.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('pagination__button-link')) {
                    this.page = parseInt(e.target.dataset.page);
                    history.pushState(null, null, this.renderLinkPage(this.page));
                    document.dispatchEvent(new CustomEvent("changePage", {
                        detail: {
                            page: this.page
                        }
                    }));
                    this.render();
                }
            });
        }
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
        this.divPagination.innerHTML = '';
        if (this.dataLength <= this.pageSize) {
            return;
        }

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
        <a class="pagination__button-link" data-page="${currentPage}" href="${this.renderLinkPage(currentPage)}">${currentPage}</a>
    </li>`;

    }

    getBtnOne() {
        const displayNoneClass = this.page !== 1 ? ' pagination__button--none' : '';
        return `<li class="pagination__button ${displayNoneClass}" >
        <a class="pagination__button-link" data-page="1" href="${this.renderLinkPage(1)}">1</a>
    </li>`;
    }

    getBtnLast() {
        const displayNoneClass = this.page !== this.pageCount ? ' pagination__button--none' : '';
        return `<li class="pagination__button ${displayNoneClass}" >
        <a class="pagination__button-link" data-page="${this.pageCount}" href="${this.renderLinkPage(this.pageCount)}">${this.pageCount}</a>
    </li>`;
    }

    getBtnActive() {
        return `  <li class="pagination__button pagination__active-btn">${this.page}</li>`;
    }

    getBtnNext() {

        const disabledClass = this.page === this.pageCount ? ' pagination__button--disabled' : '';
        const nextPage = this.page + 1;


        return ` <li class="pagination__button ${disabledClass} pagination__arrow-btn--right"  >
        <a class="pagination__button-link" data-page="${nextPage}" href="${this.renderLinkPage(nextPage)}">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M3.33329 8H12.6666" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.99996 12.6668L12.6666 8.00016L7.99996 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


        </a>

      </li>`;
    }

    getBtnPrev() {

        const disabledClass = this.page <= 1 ? ' pagination__button--disabled' : '';
        const prevPage = this.page - 1;
        return `  <li class="pagination__button pagination__arrow-btn--left ${disabledClass}">
        <a class="pagination__button-link" data-page="${prevPage}" href="${this.renderLinkPage(prevPage)}">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6667 8H3.33337" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8.00004 12.6668L3.33337 8.00016L8.00004 3.3335" stroke="black" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
</svg> 
        </a>
      </li>`;
    }

    getBtnDot(page) {
        return `<li class="pagination__button pagination__button-dots">
        <a class="pagination__button-link " data-page="${page}"  href="${this.renderLinkPage(page)}">...</a>
      </li>`;
    }


    renderLinkPage(page) {

        const params = new URLSearchParams(window.location.search);
        params.delete('page');
        if (page > 1) {
            params.append('page', page);
        }
        return `${window.location.pathname}?${params.toString()}`;
    }
}









