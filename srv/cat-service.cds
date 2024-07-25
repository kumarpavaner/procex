using my.bookshop as my from '../db/data-model';

service CatalogService {
    @readonly entity Books as projection on my.Books
    action addRandomBook () returns array of Books;
    action deleteAllBooks () returns array of Books;
    action deleteBook (ID:Integer) returns array of Books;
    action addBook (ID:Integer,TITLE:String,STOCK:Integer) returns array of Books;
    action updateBook (ID:Integer,TITLE:String,STOCK:Integer) returns array of Books;
}