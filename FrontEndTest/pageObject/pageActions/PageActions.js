import urls from "../../cypress/support/urls";

const pageElementLocators = require("../pageElements/PageElements.json");

export class PageElements {
  uname(usernamee) {
    cy.get(pageElementLocators.LoginPageLocators.username_text)
      .clear()
      .type(usernamee);
    return;
  }

  pass(passwordd) {
    cy.get(pageElementLocators.LoginPageLocators.password_text)
      .clear()
      .type(passwordd);
    return;
  }

  LoginButton() {
    cy.get(pageElementLocators.LoginPageLocators.login_button).click();
    return;
  }

  verifyInventoryPage() {
    cy.url().should("include", urls.inventory);
    return this;
  }

  addFirstItemToCart() {
    cy.get(pageElementLocators.InventoryPageLocators.firstInventoryItem).within(
      () => {
        cy.get(
          pageElementLocators.InventoryPageLocators.addToCartButton
        ).click();
      }
    );
    return this;
  }

  clickCartIcon() {
    cy.get(pageElementLocators.InventoryPageLocators.cartIcon).click();
    return this;
  }

  verifyCartPage() {
    cy.url().should("include", urls.cart);
    return this;
  }

  verifyAddedItemInCart() {
    cy.get(pageElementLocators.cartPage.cartItem).should("have.length", 1);
    return this;
  }

  verifyAddToCartButtonChanged() {
    cy.get(pageElementLocators.InventoryPageLocators.firstInventoryItem).within(
      () => {
        cy.get(pageElementLocators.InventoryPageLocators.removeButton).should(
          "contain",
          "Remove"
        );
      }
    );
    return this;
  }

  verifyCartIconCount() {
    cy.get(pageElementLocators.InventoryPageLocators.cartIcon);
    return this;
  }

  removeFirstItemFromCart() {
    cy.get(pageElementLocators.InventoryPageLocators.firstInventoryItem).within(
      () => {
        cy.get(pageElementLocators.InventoryPageLocators.removeButton)
          .contains("Remove")
          .click();
      }
    );
    return this;
  }

  verifyRemoveButtonChanged() {
    cy.get(pageElementLocators.InventoryPageLocators.firstInventoryItem).within(
      () => {
        cy.get(
          pageElementLocators.InventoryPageLocators.addToCartButton
        ).should("contain", "Add to cart");
      }
    );
    return this;
  }

  verifyCartIconNoCount() {
    cy.get(pageElementLocators.InventoryPageLocators.cartIcon).should(
      "not.contain",
      /\d+/
    );
    return this;
  }

  clickFirstInventoryItem() {
    cy.get(pageElementLocators.InventoryPageLocators.firstInventoryItem)
      .first()
      .within(() => {
        cy.get(pageElementLocators.InventoryPageLocators.itemTitleLink).click();
      });
    return this;
  }

  navigateInventoryItemPage() {
    cy.url().should("include", urls.inventory_item);
    return this;
  }

  displayItemName() {
    cy.get(pageElementLocators.itemPage.itemName).should("be.visible");
  }

  clickItemNameInCart() {
    cy.get(pageElementLocators.CartPageLocators.cartItemName).click();
  }

  verifyProductDetailsPage() {
    cy.url().should("include", "/inventory-item");
    cy.get(pageElementLocators.itemPage.itemName).should("be.visible");
  }

  verifyProductNameOnDetailsPage() {
    cy.get(pageElementLocators.itemPage.itemName)
      .invoke("text")
      .then((productName) => {
        expect(productName).to.eq("Sauce Labs Backpack");
      });
  }

  selectFilterOption(filterOption) {
    cy.get(pageElementLocators.FilterLocators.filterDropdown).select(
      filterOption
    );
  }

  verifyAscendingOrderByName() {
    cy.get(pageElementLocators.FilterLocators.itemName).then(($elements) => {
      const names = [...$elements].map((el) => el.innerText);
      const sortedNames = [...names].sort();
      expect(names).to.deep.equal(sortedNames);
    });
  }

  verifyDescendingOrderByName() {
    cy.get(pageElementLocators.FilterLocators.itemName).then(($elements) => {
      const names = [...$elements].map((el) => el.innerText);
      const sortedNames = [...names].sort().reverse();
      expect(names).to.deep.equal(sortedNames);
    });
  }

  verifyAscendingOrderByPrice() {
    cy.get(pageElementLocators.FilterLocators.itemPrice).then(($elements) => {
      const prices = [...$elements].map((el) =>
        parseFloat(el.innerText.replace("$", ""))
      );
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sortedPrices);
    });
  }

  verifyDescendingOrderByPrice() {
    cy.get(pageElementLocators.FilterLocators.itemPrice).then(($elements) => {
      const prices = [...$elements].map((el) =>
        parseFloat(el.innerText.replace("$", ""))
      );
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).to.deep.equal(sortedPrices);
    });
  }
}
