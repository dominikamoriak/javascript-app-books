/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
    'use strict';

    const select = {
      templateOf: {
        template: '#template-book',
        },

      containerOf: {
        booksList = '.books-list',
      },

    };

    render(){
        const thisProduct = this;

        for(let book of dataSource.books){

        // generate HTML based on template //
        const generatedHTML = template(thisProduct.data);

        // create element DOM using utils.createElementFromHTML //
        thisProduct.element = utils.createDOMFromHTML(generatedHTML);

        // find container .books-list //
        const booksListContainer = document.querySelector(select.containerOf.booksList);

        // add element DOM to container .books-list //
        booksListContainer.appendChild(thisProduct.element);
            }
    }
    render();



}