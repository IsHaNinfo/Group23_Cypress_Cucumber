const baseUrl = Cypress.config('baseUrlAPI');

class Books {
  visitBooksPage() {
    cy.url().should('eq', `${baseUrl}books`);
  }

  getAllBooks() {
    return cy.request('GET', baseUrl + '/api/books');
  }

  getBookById(bookId) {
    return cy.request({
        method: 'GET',
        url: baseUrl + '/api/books/' + bookId,
        failOnStatusCode: false,
    });
  }

  deleteBook(bookId) {
    return cy.request('DELETE', `${baseUrl}/api/books/${bookId}`);
  }
  
  addBook(bookData) {
    return cy.request({
      method: 'POST',
      url: `${baseUrl}/api/books`, 
      body: bookData, 
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false, 
    });
  }


}

const books = new Books();
export default books;
