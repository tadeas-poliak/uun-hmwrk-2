const List_item_controller = require("../Controller/ListItem.controller")
const request = require("supertest");
const app = require("../app");



describe("Wrong Get Scenario", () => {
  test("Respond to get all items", done => {
    request(app)
      .get("/api/item/getAll")
      .then(response => {
        expect(response.statusCode).toBe(200);
        let obtained_data = JSON.parse(response.res.text);
        expect(obtained_data.code).toBe(200);

        expect(obtained_data.data.result instanceof Array).toBe(true);
        done();
      });
  });

  
  //Getting by WRONG id => did not find item with given ID
  test("Respond to get item by id", done => {
    request(app)
      .get("/api/item/get/" + "456165256f485")
      .then(response => {
        expect(response.statusCode).toBe(201);
        done();
      });
  });

})