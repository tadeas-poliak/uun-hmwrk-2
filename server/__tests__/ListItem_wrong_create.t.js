const List_item_controller = require("../Controller/ListItem.controller")
const request = require("supertest");
const app = require("../app");

describe("Test List Item For Wrong Create", () => {
    
    //Creating new wrong list
    test("Respond on creating new wrong list", done => {
        let payload =
        {
            name: 12, //<== supposed to be string
            owner: "",
            member_id_list: [],
            archived_user_id_list: [],
            item_id_list: []
        }
        request(app)
            .post("/api/shoppingList/create",)
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .then(response => {
                expect(response.statusCode).toBe(500);
                done();
            });
    });

})