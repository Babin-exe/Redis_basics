import client from "./client.js";

async function init() {
  
    //Set the value 
  
   //await client.set("message:2", "First message");
  
   //Put Ttl (Time-To-Live. ) 
  
  //await client.expire("message:2", 5);

  //Get the value through its key 
  const result = await client.get("message:2");
  
  console.log("Result->", result);
}
init()
  .then(() => {
    console.log("Message is set");
  })
  .catch((error) => {
    console.error("Error : ", error);
  });
