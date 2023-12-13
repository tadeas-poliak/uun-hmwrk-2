const List_item_controller = require("../Controller/ListItem.controller")
const request = require("supertest");
const app = require("../app");

describe("Test List Item", () => {
    //Getting all
    test("Respond to get all list", done => {
        request(app)
            .get("/api/shoppingList/getAll")
            .then(response => {
                expect(response.statusCode).toBe(200);
                let obtained_data = JSON.parse(response.res.text);
                expect(obtained_data.code).toBe(200);

                expect(obtained_data.data.result instanceof Array).toBe(true);
                done();
            });
    });

    //Creating new
    let new_list_id = "";
    test("Respond on creating new list", done => {
        let payload =
        {
            name: "Unit test item",
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
                expect(response.statusCode).toBe(200);
                let obtained_data = JSON.parse(response.res.text);
                expect(obtained_data.code).toBe(200);
                //Newly created list
                expect(typeof obtained_data.data.result.id === "string").toBe(true)
                expect(obtained_data.data.result.name).toBe(payload.name);
                new_list_id = obtained_data.data.result.id;
                done();
            });
    });

    //Getting by id
    test("Respond to get list by id", done => {
        request(app)
            .get("/api/shoppingList/get/"+new_list_id)
            .then(response => {
                expect(response.statusCode).toBe(200);
                let obtained_data = JSON.parse(response.res.text);
                expect(obtained_data.code).toBe(200);

                expect(obtained_data.data.result instanceof Object).toBe(true);
                expect(typeof obtained_data.data.result.id === "string").toBe(true);
                expect(obtained_data.data.result.item_id_list instanceof Array).toBe(true);
                expect(obtained_data.data.result.member_id_list instanceof Array).toBe(true);
                expect(typeof obtained_data.data.result.name === "string").toBe(true);
                expect(obtained_data.data.result.archived_user_id_list instanceof Array).toBe(true);

                done();
            });
    });

    //Updating
    test("Respond on updating list", done => {
        let payload =
        {
            id: new_list_id,
            name: "Unit test item updated",
            owner: "new owner",
            member_id_list: [],
            archived_user_id_list: [],
            item_id_list: []
        }
        request(app)
            .post("/api/shoppingList/update",)
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
    test("Respond on deleting list", done => {
        request(app)
            .post("/api/shoppingList/delete/" + new_list_id,)
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