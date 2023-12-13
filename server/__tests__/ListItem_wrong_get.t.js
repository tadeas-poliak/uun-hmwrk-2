const List_item_controller = require("../Controller/ListItem.controller")
const request = require("supertest");
const app = require("../app");

describe("Test List Item For Wrong Get", () => {
  
    //Getting by WRONG id
    test("Respond to get list by id", done => {
        request(app)
            .get("/api/shoppingList/get/"+"1234")
            .then(response => {
                expect(response.statusCode).toBe(201);
                done();
            });
    });

})