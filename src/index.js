import Paginator from "./js/Paginator";

let dataLength = 1000;

const pageSize = 20;

const paginator = new Paginator(Paginator.getCurrentPage(), pageSize, dataLength);
paginator.render();
