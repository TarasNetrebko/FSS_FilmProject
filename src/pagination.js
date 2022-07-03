// class Paginator {

//     constructor(page, pageSize, dataLength) {
//         this.page = page;
//         this.pageSize = pageSize;
//         this.dataLength = dataLength;
//     }



//     get pageCount() {
//         return Math.ceil(this.dataLength / this.pageSize);
//     }
//     get pages() {
//         const pages = [];
//         for (let i = 1; i <= this.pageCount; i++) {
//             pages.push(i);
//         }
//         return pages;
//     }
//     get prev() {
//         return this.page - 1;
//     }
//     get next() {
//         return this.page + 1;
//     }
//     get hasPrev() {
//         return this.prev > 0;
//     }
//     get hasNext() {
//         return this.next <= this.pageCount;
//     }
// }

const dataLength = 1000;
var params = new URLSearchParams(window.location.search);
console.log(params.get('page'));
let currentPage = parseInt(params.get('page'));
console.log(location);
console.log(currentPage);


const pageSize = 20;
const pageCount = Math.ceil(dataLength / pageSize);


const divPagination = document.querySelector('.pagination');


function renderPagination(currentPage) {
    const lastPage = pageCount;
    console.log("current", currentPage);
    console.log(lastPage);
    const prevPage = currentPage - 2;
    console.log(prevPage);
    const nextPage = currentPage + 2;
    console.log(nextPage);

    if (currentPage > 1) {
        divPagination.insertAdjacentHTML('beforeend', getBtnPrev());

    }
    divPagination.insertAdjacentHTML('beforeend', getBtnOne());

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
    if (currentPage < pageCount) {
        divPagination.insertAdjacentHTML('beforeend', getBtnLast());
        divPagination.insertAdjacentHTML('beforeend', getBtnNext());

    }
} function getBtnDefault(currentPage) {
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

