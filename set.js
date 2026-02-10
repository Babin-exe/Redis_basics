import client from "./client.js";
async function set() {
  //   Add values to set
  await client.sadd("mySet", "Third value", "Fourth value", "Fifth value");
  await client.sadd("mySet", "First value ", "second value");

  //   Get The Members of set
  const response = await client.smembers("mySet");
  console.log("The value(s) of set are : ", response);

  //   Remove some value from the set
  //   await client.srem("mySet", "Third value");

  //   Check if a value exists in a set ,1 means exists and 0 means doesn't exists
  const checked = await client.sismember("mySet", "Fourth value");
  console.log("Status :", checked);

  //   Check the size of the set
  const setSize = await client.scard("mySet");
  console.log("The size of the set is : ", setSize);

  // Move value from one set to another
  await client.sadd("set1", "x", "y");
  await client.sadd("set2", "z");
  const moveResult = await client.smove("set1", "set2", "y");
  console.log(moveResult);

  // Pop random value from the set
  //   const random = await client.spop("mySet");
  //   console.log("Something is popped : ", random);

  //Get random value from the set without removing it
  const rand = await client.srandmember("mySet");
  console.log("Random value from the set is : ", rand);

  //Get random value from the set with specific quantity
  const r = 3;
  const numRand = await client.srandmember("mySet", r);
  console.log(`Random ${r} values of set are : `, numRand);

  console.log(await client.sinter("set1", "set2"));
  console.log(await client.sdiff("set1", "set2"));
  console.log(await client.sunion("set1", "set2"));
}

set()
  .then(() => {
    console.log("Set function successfully executed");
  })
  .catch((error) => {
    console.error("Error: ", error);
  });
