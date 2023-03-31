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
      imageId: 'data-id',
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

    // find the books list container
    const booksListContainer = document.querySelectorAll(select.containerOf.productsList);
    console.log(booksListContainer);

    // add event listener to books list container
    booksListContainer.addEventListener('dblclick', function(event){
    // find the clicked book image
      const clickedElement = event.target.offsetParent;
      // check if the clicked element is a book image
      if(clickedElement.classList.contains(select.menuProduct.imageWrapper)){
        event.preventDefault();

        // check if the book is already favorited
        if(clickedElement.classList.contains('favorite')){

          // yes, it's favorited, so remove the favorite class from the dblclick element
          clickedElement.classList.remove('favorite');
          // getAttribute 'data-id' from dblclick element
          const bookId = clickedElement.getAttribute(select.menuProduct.imageId);
          console.log(bookId);

          // find the index of the bookId in [] the favoriteBooks array
          const index = favoriteBooks.indexOf(bookId);
          // remove bookId from [] the favoriteBooks array
          favoriteBooks.splice(index, 1);

        } else {
        // no, it'snt favorited, so add class favorite to the dblclick image
          clickedElement.classList.add('favorite');
          // getAttribute from data-id dblclick image
          const bookId = clickedElement.getAttribute(select.menuProduct.imageId);
          console.log(bookId);
          // add const bookId to [] the favoriteBooks array
          favoriteBooks.push(bookId);
        }
        console.log(favoriteBooks);
      }
    });
  }
  initActions();
}