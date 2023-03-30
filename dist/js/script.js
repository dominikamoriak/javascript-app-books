/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      templateBook: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
    },
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };

  function render(){
    const thisProduct = this;

    for(let book of dataSource.books){
      console.log(book);

      // generate HTML based on template //
      const generatedHTML = templates.templateBook(thisProduct.data);

      // create element DOM using utils.createElementFromHTML //
      thisProduct.dom = utils.createDOMFromHTML(generatedHTML);

      // find container .books-list //
      const booksListContainer = document.querySelector(select.containerOf.booksList);

      // add element DOM to container .books-list //
      booksListContainer.appendChild(thisProduct.dom);
    }
  }
  render();


}