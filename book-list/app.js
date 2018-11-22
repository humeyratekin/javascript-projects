function Book(title,author,isbn){
  this.title=title;
  this.author=author;
  this.isbn=isbn;
}

function UI(){}

function Store(){}

Store.prototype.getBooks=function(){
  let books;
    if(localStorage.getItem('books')===null){
      books=[];
    }else{
      books=JSON.parse(localStorage.getItem('books'));
    }

    return books;
}

Store.prototype.displayBooks=function(){
  const books=Store.getBooks();

    books.forEach(function(book){
      const ui=new UI;
      ui.addBookToList(book);
    });

}
Store.prototype.addBook=function(book){
  const books=Store.getBooks();
  books.push(book);
  localStorage.setItem('books',JSON.stringify(books));
}

Store.prototype.removeBook=function(isbn){
  const books=Store.getBooks();
    books.forEach(function(book,index){
      if(book.isbn===isbn){
        books.splice(index,1);
      }
    });
    localStorage.setItem('books',JSON.stringify(books));
}

document.addEventListener('DOMContentLoaded',Store.displayBooks);



UI.prototype.addBookToList=function(book){ 
  const list=document.getElementById('book-list');
  const row=document.createElement('tr'); 
  //Insert cols
  row.innerHTML=`
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X<a></td>
  `;

  list.appendChild(row);
   
}

//Show alert
UI.prototype.showAlert=function(message,className){
  
  const div=document.createElement('div');
  div.className=`alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container=document.querySelector('.container');
  const form=document.querySelector('#book-form');
  container.insertBefore(div,form);

  setTimeout(function(){
    document.querySelector('.alert').remove();
  },3000);

}

UI.prototype.deleteBook=function(target){
  if(target.className='delete'){
    target.parentElement.parentElement.remove();
  }
}

UI.prototype.clearFields=function(){
  document.getElementById('title').value='';
  document.getElementById('author').value='';
  document.getElementById('isbn').value='';
}





document.getElementById('book-form').addEventListener('submit',

function(e){
  //Get form values 
  const title=document.getElementById('title').value,
        author=document.getElementById('author').value,
        isbn=document.getElementById('isbn').value;

  const book=new Book(title,author,isbn);
  
  const ui=new UI();
  const store=new Store();

  if(title===''||author===''||isbn===''){
    //Error alert
    ui.showAlert('Please fill in all areas','error');
  }else{
  //Add book to list
  ui.addBookToList(book);
  store.addBook(book);

  ui.showAlert('Book added!','success');

  //Clear fields
  ui.clearFields();

  
  }

  e.preventDefault();
});


//Event Listener For Delete
document.getElementById('book-list').addEventListener
('click',function(e)
{
  const store=new Store();
  const ui=new UI();
  ui.deleteBook(e.target);
  store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('Book removed!','success');
  e.preventDefault();
})