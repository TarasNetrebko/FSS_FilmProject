const dataLength = 1000;
var params = new URLSearchParams(window.location.search);

let currentPage = parseInt(params.get('page') ?? 1);

const pageSize = 20;
const pageCount = Math.ceil(dataLength / pageSize);


const divPagination = document.querySelector('.pagination');


function renderPagination(currentPage) {
    const lastPage = pageCount;

    const prevPage = (currentPage - 2) > 0 ? (currentPage - 2) : 1;

    let nextPage = (currentPage + 2 > lastPage) ? lastPage : (currentPage + 2);


    if (currentPage > 1) {
        divPagination.insertAdjacentHTML('beforeend', getBtnPrev());
    }

    if (currentPage > 3) {
        divPagination.insertAdjacentHTML('beforeend', getBtnOne());
    }


    if (5 <= currentPage) {
        divPagination.insertAdjacentHTML('beforeend', getBtnDot());

    } if (2 <= currentPage <= (lastPage - 1)) {

        for (let i = prevPage; i <= nextPage; i++) {

            if (i === currentPage) {
                divPagination.insertAdjacentHTML('beforeend', getBtnActive(i));
            } else {

                divPagination.insertAdjacentHTML('beforeend', getBtnDefault(i));

            }
        }

    }

    if (currentPage < (lastPage - 4)) {
        divPagination.insertAdjacentHTML('beforeend', getBtnDot());
    }

    if (currentPage < (lastPage - 2)) {
        divPagination.insertAdjacentHTML('beforeend', getBtnLast());
    }
    if (currentPage < pageCount) {
        divPagination.insertAdjacentHTML('beforeend', getBtnNext());
    }
}

function getBtnDefault(currentPage) {
    return `<li class="pagination__button" >
        <a class="pagination__button-link" href="?page=${currentPage}">${currentPage}</a>
    </li>`;

}
function getBtnOne() {
    return `<li class="pagination__button" >
        <a class="pagination__button-link" href="?page=1">1</a>
    </li>`;
}
function getBtnLast() {
    return `<li class="pagination__button" >
        <a class="pagination__button-link" href="?page=${pageCount}">${pageCount}</a>
    </li>`;
}

function getBtnActive(currentPage) {
    return `  <li class="pagination__button pagination__active-btn">${currentPage}</li>`;

}

function getBtnNext() {
    return ` <li class="pagination__button pagination__arrow-btn" >
        <a class="pagination__button-link" href="">
          <svg class="pagination__icon-arrow">
            <use  href="/src/images/arrow-right.svg"></use>
          </svg>
        </a>
       
      </li>`;
}

function getBtnPrev() {
    return `  <li class="pagination__button pagination__arrow-btn">
        <a class="pagination__button-link" href="">
          <svg class="pagination__icon-arrow">
            <use  href="/src/images/arrow-left.svg"></use>
          </svg>
        </a>
      </li>`;
}


function getBtnDot() {
    return `<li class="pagination__button">
        <a class="pagination__button-link" href="">...</a>
      </li>`;
}

renderPagination(currentPage);

