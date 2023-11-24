//AJV format
module.exports =  {
  type:"object",
  properties:
  {
      id:{type:"string",minLength:32,maxLength:64},
      name:{type:"string",minLength:1,maxLength:256},
  },
  required:["id","name",]
};