import client from "./client.js";

async function init() {
//   await client.set("message:2", "First message");
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
