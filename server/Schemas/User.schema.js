const path = require("path");

module.exports =
{
    type: "object",
    properties:
    {
        id: { type: "string", minLength: 0, maxLength: 64 },
        user_name: { type: "string", minLength: 4, maxLength: 16 },
        password: { type: "string", minLength: 8, maxLength: 16 } // Propably will be encrypted in the future
    },
    required:["id","user_name","password"]
};