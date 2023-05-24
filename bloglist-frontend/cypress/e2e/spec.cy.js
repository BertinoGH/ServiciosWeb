describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Test Cypress",
      username: "test",
      password: "password",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Blogs");
    cy.contains("Log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("password");
      cy.get("#login-btn").click();
      cy.contains("Test Cypress logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("wrong");
      cy.get("#login-btn").click();
      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Cassiano Caron logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "password" });
    });

    it("a blog can be created", function () {
      cy.createBlog({
        title: "A blog created by cypress",
        author: "Cypress",
        url: "https://www.test.com/",
      });

      cy.contains("A blog created by cypress");
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "First blog",
          author: "cypress",
          url: "https://www.test.com/",
        });
        cy.createBlog({
          title: "Second blog",
          author: "cypress",
          url: "https://www.test.com/",
        });
        cy.createBlog({
          title: "Third blog",
          author: "cypress",
          url: "https://www.test.com/",
        });
      });

      it("one of those can be liked", function () {
        cy.contains("Third blog").parent().find("button").click();
        cy.get("#like-btn").click();
      });

      it("one of those can be deleted", function () {
        cy.contains("Second blog").parent().find("button").click();
        cy.get("#delete-btn").click();
        cy.get("html").should("not.contain", "Second blog");
      });

      it("they are ordered by the number of likes in descending order", async function () {
        cy.contains("Third blog").parent().find("button").click();
        cy.get("#like-btn").click().wait(500).click().wait(500);
        cy.contains("Third blog").parent().find("button").click();

        cy.contains("Second blog").parent().find("button").click();
        cy.get("#like-btn")
          .click()
          .wait(500)
          .click()
          .wait(500)
          .click()
          .wait(500);

        cy.get(".blog").eq(0).should("contain", "Second blog");
        cy.get(".blog").eq(1).should("contain", "Third blog");
        cy.get(".blog").eq(2).should("contain", "First blog");
      });
    });
  });
});