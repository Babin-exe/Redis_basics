import client from "./client.js";

async function orderedSet() {
  //   // Put the values in OrderedSet
  //   await client.zadd("Leaderboard", 100, "Babin");
  //   await client.zadd("Leaderboard", 200, "Sankalan");
  //   await client.zadd("Leaderboard", 300, "Nikesh");

  // Get the values low to high
  const result = await client.zrange("Leaderboard", 0, -1);
  console.log("Low to High is : ", result);

  //Get the values high to low
  const high_to_low = await client.zrevrange("Leaderboard", 0, -1);
  console.log("High to low is : ", high_to_low);

  //Low to high with score
  console.log(await client.zrange("Leaderboard", 0, -1, "WITHSCORES"));

  //High to low with score
  console.log(await client.zrevrange("Leaderboard", 0, -1, "WITHSCORES"));

  //Get the rank low to high
  console.log(await client.zrank("Leaderboard", "Babin"));

  //Get the rank high to low
  console.log(await client.zrevrank("Leaderboard", "Babin"));

  //Get the score
  console.log(await client.zscore("Leaderboard", "Babin"));

  // Get the values within score range
  console.log(await client.zrangebyscore("Leaderboard", 100, 200));

  //   Remove from the set
  console.log(await client.zrem("Leaderboard", "Babin"));

  // Check cardinality of the set
  console.log(await client.zcard("Leaderboard"));

  // Increment the score by some value
  console.log(await client.zincrby("Leaderboard", 50, "Sankalan"));
}

orderedSet()
  .then(() => {
    console.log("Ordered Set function executed successfully");
  })
  .catch((error) => {
    console.error("Error : ", error);
  });
