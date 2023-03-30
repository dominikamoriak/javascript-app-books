/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      templateProduct: '#template-book',
    },

    containerOf: {
      productsList: '.books-list',
    },

    menuProduct: {
      imageWrapper: '.book__image',
    }

  };

  const templates = {
    templateProduct: Handlebars.compile(document.querySelector(select.templateOf.templateProduct).innerHTML),
  };

  function render(){
    const thisProduct = this;

    for(let book of dataSource.books){
      console.log(book);

      // generate HTML based on template //
      const generatedHTML = templates.templateProduct(book);
      console.log(generatedHTML);

      // create element DOM using utils.createElementFromHTML //
      thisProduct.bookElementDom = utils.createDOMFromHTML(generatedHTML);

      // find container .books-list //
      const booksListContainer = document.querySelector(select.containerOf.productsList);
      console.log(booksListContainer);

      // add element DOM to container .books-list //
      booksListContainer.appendChild(thisProduct.bookElementDom);
    }
  }
  render();

  function initActions(){
    const favoriteBooks = [];

    // find all book images
    const bookImages = document.querySelectorAll(select.menuProduct.imageWrapper);
    console.log(bookImages);

    for(let image of bookImages){
      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clickedElement = this;

        // check if the book is already favorited
        if(image.classList.contains('favorite')){

          // yes, it's favorited, so remove the favorite class
          clickedElement.classList.remove('favorite');
          // getAttribute 'data-id' from dblclick element
          const bookId = clickedElement.getAttribute('data-id');
          console.log(bookId);
          // find the index of the bookId in [] the favoriteBooks array
          const index = favoriteBooks.indexOf(bookId);
          // remove bookId from [] the favoriteBooks array
          favoriteBooks.splice(index, 1);

        } else {
        // no, it'snt favorited, so add class favorite to the dblclick image
          clickedElement.classList.add('favorite');
          // getAttribute from data-id dblclick image
          const bookId = clickedElement.getAttribute('data-id');
          console.log(bookId);
          // add const bookId to [] the favoriteBooks array
          favoriteBooks.push(bookId);
        }
        console.log(favoriteBooks);
      });
    }
  }
  initActions();
}