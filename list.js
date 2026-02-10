import client from "./client.js";

async function list() {
  /* ---------------- LPUSH / LPOP ---------------- */
  await client.lpush("mylist", "Left 1");
  await client.lpush("mylist", "Left 2"); // pushes to the left
  const leftVal = await client.lpop("mylist"); // removes from left
  console.log("LPOP Result ->", leftVal);

  /* ---------------- RPUSH / RPOP ---------------- */
  await client.rpush("mylist", "Right 1");
  await client.rpush("mylist", "Right 2"); // pushes to the right
  const rightVal = await client.rpop("mylist"); // removes from right
  console.log("RPOP Result ->", rightVal);

  /* ---------------- LLEN ---------------- */
  const length = await client.llen("mylist"); // get list length
  console.log("List length ->", length);

  /* ---------------- LRANGE ---------------- */
  // Get elements from start to end
  const range = await client.lrange("mylist", 0, -1); // 0 to -1 = full list
  console.log("List elements ->", range);

  /* ---------------- LINDEX ---------------- */
  const index0 = await client.lindex("mylist", 0); // get element at index 0
  console.log("Element at index 0 ->", index0);

  /* ---------------- LSET ---------------- */
  await client.lset("mylist", 0, "Updated Left 0");
  console.log("After LSET ->", await client.lrange("mylist", 0, -1));

  /* ---------------- LREM ---------------- */
  // Remove elements matching a value, count = number of occurrences
  await client.lrem("mylist", 1, "Right 1");
  console.log("After LREM ->", await client.lrange("mylist", 0, -1));

  /* ---------------- RPOPLPUSH / LMOVE ---------------- */
  // Move element from one list to another
  await client.rpush("source", "A", "B", "C");
  await client.lpush("dest", "X", "Y");

  const moved = await client.lmove("source", "dest", "RIGHT", "LEFT"); // move rightmost of source to left of dest
  console.log("LMOVE Result ->", moved);
  console.log("Source list ->", await client.lrange("source", 0, -1));
  console.log("Dest list ->", await client.lrange("dest", 0, -1));

  await client.rpush("queue", "task1");
  const result = await client.blpop("queue", 2);
  console.log(result); // ["queue", "task1"]
  
}

list()
  .then(() => console.log("List function executed"))
  .catch((err) => console.error("Error :", err));
