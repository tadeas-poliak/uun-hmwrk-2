const List_item_controller = require("../Controller/ListItem.controller")
const request = require("supertest");
const app = require("../app");

describe("Test List Item", () => {
  

  //Creating with wrong schema
  let new_item_id = "";
  test("Respond on creating new list", done => {
    let payload =
    {
      name: 15, // <== supposed to be string
    }
    request(app)
      .post("/api/item/create",)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(500);
        done();
      });
  });


})