import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import login from "../../API/Login/login.cy";
import Books from "../../API/Books/books.cy";

let response;

Given("user is logged into the service", () => {
  login.loginAuth("admin", "password").then((res) => {
    cy.wrap(res.body.token).as("authToken");
  });
});

Given("user is authenticated as {string}", (role) => {
  login.loginAuth(role, "password").then((res) => {
    cy.wrap(res.body.token).as("authToken");
  });
});

When(
  "user sends a DELETE request for the book with ID {string}",
  (invalidId) => {
    cy.get("@authToken").then((token) => {
      Books.deleteBook(invalidId).then((res) => {
        cy.wrap(res).as("deleteResponse");
      });
    });
  }
);

Then("the Delete response status should be {int}", (statusCode) => {
  cy.get("@deleteResponse").then((response) => {
    expect(response.status).to.eq(statusCode);
  });
});
