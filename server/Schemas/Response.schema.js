exports.get_response = (code, message, data) =>
{
    if(!code || typeof code !== "number")
        code = 201;
    if (!message || typeof message !== "string")
        message = "";
    if (typeof data === "undefined")
        data = {};
    return {code,message,data:{result:data}};
};