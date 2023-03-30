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
      imageId: '.data-id',
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
    console.log(favoriteBooks);

    // find all book images
    const bookImages = document.querySelectorAll(select.menuProduct.imageWrapper);
    console.log(bookImages);

    for(let image of bookImages){
      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        // add class favorite to the dblclick image
        image.classList.add('favorite');
        // getAttribute from data-id dblclick image
        const bookId = image.getAttribute(select.menuProduct.imageId);
        console.log(bookId);
        // add const bookId to the favoriteBooks []
        favoriteBooks.push(bookId);
      });
    }
  }
  initActions();
}