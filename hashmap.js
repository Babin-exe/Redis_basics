import client from "./client.js";
async function hashmap() {
  //Set the Key-value in the hashmap
  await client.hset("myHash:1", "name", "Babin");
  await client.hset("myHash:1", "age", "19", "role", "admin");

  // Get the value From the hashmaof of a key
  const result = await client.hget("myHash:1", "name");
  console.log("Name is :", result);
  console.log("Age is :", await client.hget("myHash:1", "age"));
  console.log("Role is  :", await client.hget("myHash:1", "role"));

  //Get multiple values from the hashmap
  const values = await client.hmget("myHash:1", "name", "role");
  console.log(values);

  //Get all the values
  const all = await client.hgetall("myHash:1");
  console.log(all);

  //Delete from hashmap
  const del_res = await client.hdel("myHash:1", "role");
  console.log(del_res);

  //Check if value exists in the hashmap
  const exists = await client.hexists("myHash:1", "name");
  console.log(exists); // 1 = yes, 0 = no

  //Find the length of the hashmap
  const fieldCount = await client.hlen("myHash:1");
  console.log("The length of hashMap is : ", fieldCount);

  //Setting and incrementing a counter
  await client.hset("myHash:1", "score", "10");
  await client.hincrby("myHash:1", "score", 5);
  await client.hincrbyfloat("myHash:1", "score", 2.5);
}

hashmap()
  .then(() => {
    console.log("Hashmap function executed successfully");
  })
  .catch((error) => {
    console.error("Error : ", error);
  });
