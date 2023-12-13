const List_item_controller = require("../Controller/ListItem.controller")
const request = require("supertest");
const app = require("../app");

describe("Test List Item", () => {
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

  //Creating new
  let new_item_id = "";
  test("Respond on creating new list", done => {
    let payload =
    {
      name: "Unit test item"
    }
    request(app)
      .post("/api/item/create",)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        let obtained_data = JSON.parse(response.res.text);
        expect(obtained_data.code).toBe(200);
        //Newly created list
        expect(typeof obtained_data.data.result.id === "string").toBe(true)
        expect(obtained_data.data.result.name).toBe(payload.name);
        new_item_id = obtained_data.data.result.id;
        done();
      });
  });

  //Getting by id
  test("Respond to get item by id", done => {
    request(app)
      .get("/api/item/get/" + new_item_id)
      .then(response => {
        expect(response.statusCode).toBe(200);
        let obtained_data = JSON.parse(response.res.text);
        expect(obtained_data.code).toBe(200);

        expect(obtained_data.data.result instanceof Object).toBe(true);
        expect(typeof obtained_data.data.result.id === "string").toBe(true);
        expect(typeof obtained_data.data.result.name === "string").toBe(true);

        done();
      });
  });

  //Updating
  test("Respond on updating item", done => {
    let payload =
    {
      id: new_item_id,
      name: "Unit test item updated",
    }
    request(app)
      .post("/api/item/update",)
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        let obtained_data = JSON.parse(response.res.text);
        expect(obtained_data.code).toBe(200);
        done();
      });
  });

  //Deleting
  test("Respond on deleting item", done => {
    request(app)
      .post("/api/item/delete/" + new_item_id,)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(200);
        let obtained_data = JSON.parse(response.res.text);
        expect(obtained_data.code).toBe(200);
        done();
      });
  });

})