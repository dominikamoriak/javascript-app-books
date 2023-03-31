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
      productId: 'data-id',
      imageId: '.book__image[data-id="id-of-the-book-here"]',
      filtersForm: '.filters',
      filtersInputName: 'filters.input[name="filter"]',
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
    const booksListContainer = document.querySelector(select.containerOf.productsList);
    console.log(booksListContainer);

    // add event listener to books list container
    booksListContainer.addEventListener('dblclick', function(event){
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
    const filtersForm = document.querySelector(select.menuProduct.filtersForm);
    console.log(filtersForm);

    filtersForm.addEventListener('click', function(event){
    // check if clicked on element that is our checkbox
    // if tagName = input? if type = checkbox? if name = filter?
      if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
        // yes - so show me his value
        console.log(event.target.value);

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
      filterBooks();
    });
  }
  initActions();

  function filterBooks(){

    const filters = document.querySelectorAll(select.menuProduct.filtersInputName);
    console.log(filters);
    
    for(let book of dataSource.books){
      let shouldBeHidden = false;

      for(let filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }

        const bookImageId = document.querySelector(select.menuProduct.imageId);
        console.log(bookImageId);

        // check value of shouldBeHidden
        if(shouldBeHidden){
        // = true, so find element .book__image and add class hidden
          bookImageId.classList.add('hidden');
        } else {
        // = false, so get class hidden
          bookImageId.classList.remove('hidden');
        }

      }

    

    }
  }
}