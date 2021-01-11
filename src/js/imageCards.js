import refs from "./refs.js";
import cards from "../templates/cards.hbs";
import getImages from "./requestImg.js";
import notification from "./notifications.js";

let page = 1;
let inputValue = "";
let cardSet = 0;
refs.form.addEventListener('submit', toFetch);

function buttonRemove() {
    refs.button.classList.add('hiden');
}

function buttonAdd() {
    refs.button.classList.remove('hiden');
}

function toFetchMore (){
  setTimeout(() => {
    window.scrollTo({
      top:  refs.gallery.scrollHeight,
      behavior: "smooth"
  });
  }, 0)
}

function setOfCards(searchName) {
    if (searchName.hits.length === 0) {
        notification.notFound();
        return;
    }
    searchName.hits.map(elem =>
        refs.gallery.insertAdjacentHTML('beforeend', cards(elem)));
    cardSet += searchName.hits.length;
    if (cardSet === searchName.totalHits || searchName.totalHits < 12) {
        buttonRemove();
        return;
    }
    buttonAdd();
    toFetchMore();
}

function toFetch(e) {
    e.preventDefault();
    page = 1;
    inputValue = refs.form.elements.query.value;
    refs.gallery.innerHTML = "";
    getImages(inputValue, page).then(setOfCards).catch();
}

refs.button.addEventListener('click', () => {
    page += 1;
    getImages(inputValue, page).then(setOfCards).catch();
})