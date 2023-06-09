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
      mainWrapper: '.container',
      imageWrapper: '.book__image',
      productId: 'data-id',
      filtersForm: '.filters',
      filtersInputName: 'filters.input[name="filter"]',
    }

  };

  const templates = {
    templateProduct: Handlebars.compile(document.querySelector(select.templateOf.templateProduct).innerHTML),
  };

  class BooksList{
    constructor(){
      const thisProduct = this;

      thisProduct.initData();
      thisProduct.getElements();
      thisProduct.initActions(thisProduct.booksListContainer);
    }

    initData(){
      this.data = dataSource.books;
      const thisProduct = this;

      // find container .books-list //
      thisProduct.booksListContainer = document.querySelector(select.containerOf.productsList);
      console.log(thisProduct.booksListContainer);

      for(let book of dataSource.books){
        console.log(book);

        const ratingBgc = thisProduct.determineRatingBgc(book.rating);
        console.log(ratingBgc);
        const ratingWidth = (book.rating*10);
        console.log(ratingWidth);

        // add ratingBgc and ratingWidth to the book object
        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;

        // generate HTML based on template //
        const generatedHTML = templates.templateProduct(book);
        console.log(generatedHTML);

        // create element DOM using utils.createElementFromHTML //
        thisProduct.bookElementDom = utils.createDOMFromHTML(generatedHTML);

        // add element DOM to container .books-list //
        thisProduct.booksListContainer.appendChild(thisProduct.bookElementDom);
      }
    }

    getElements(){
      const thisProduct = this;

      thisProduct.dom = {
        wrapper: document.querySelector(select.menuProduct.mainWrapper)
      },
  
      thisProduct.filtersForm = thisProduct.dom.wrapper.querySelector(select.menuProduct.filtersForm);
      console.log(thisProduct.filtersForm);
    }

    initActions(){
      const thisProduct = this;
      const favoriteBooks = [];

      // add event listener to books list container
      thisProduct.booksListContainer.addEventListener('dblclick', function(event){
        // find the clicked book image
        const clickedElement = event.target.offsetParent;
        // check if the clicked element is a book image
        if(clickedElement.classList.contains('book__image')){
          event.preventDefault();

          // check if the book is already favorited
          if(clickedElement.classList.contains('favorite')){

            // yes, it's favorited, so remove the favorite class from the dblclick element
            clickedElement.classList.remove('favorite');
            // getAttribute 'data-id' from dblclick element
            const bookId = clickedElement.getAttribute(select.menuProduct.productId);
            console.log(bookId);

            // find the index of the bookId in [] the favoriteBooks array
            const index = favoriteBooks.indexOf(bookId);
            // remove bookId from [] the favoriteBooks array
            favoriteBooks.splice(index, 1);

          } else {
            // no, it'snt favorited, so add class favorite to the dblclick image
            clickedElement.classList.add('favorite');
            // getAttribute from data-id dblclick image
            const bookId = clickedElement.getAttribute(select.menuProduct.productId);
            console.log(bookId);
            // add const bookId to [] the favoriteBooks array
            favoriteBooks.push(bookId);
          }
          console.log(favoriteBooks);
        }
      });

      const filters = [];

      thisProduct.filtersForm.addEventListener('click', function(event){
        // check if clicked on element that is our checkbox
        // if tagName = input? if type = checkbox? if name = filter?
        if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
          // yes - so show me his value
          console.log(event.target.value);

          thisProduct.filterBooks(filters);
          
          // check if the input is selected?
          if(event.target.checked){
            console.log(event.target.checked);
            // yes - input is selected, so add filter's value to the [] filters array
            filters.push(event.target.value);
            // no - input isn't selected, so remove filter's value from the [] filters array
          } else {
            const index = filters.indexOf(event.target.value);
            filters.splice(index, 1);
          }
        }
        console.log(filters);
      });
    }

    filterBooks(filters){
        
      for(let book of dataSource.books){
        let shouldBeHidden = false;

        for(const filter of filters){
          // if value of details isn't true!
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
          const bookImageId = document.querySelector('.book__image[data-id="' + book.id +'"]');
          console.log(bookImageId);

          // check value of shouldBeHidden
          if(shouldBeHidden){
            // = true, so find element .book__image and add class hidden
            bookImageId.classList.add('hidden');
          } else {
            // = false, so get class hidden
            bookImageId.classList.remove('hidden');
          }

          console.log(filters);
        }

      }

    }

    determineRatingBgc(rating){

      if(rating < 6){
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
      } else if(rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }
    }
  }
  new BooksList();
}