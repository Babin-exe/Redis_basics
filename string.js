import client from "./client.js";

async function init() {

  /* ---------------- BASIC SET / GET ---------------- */

  // Set a value
  await client.set("message:1", "Hello Redis");

  // Get a value
  const msg1 = await client.get("message:1");
  console.log("message:1 ->", msg1);


  /* ---------------- SET WITH TTL ---------------- */

  // Set value with expiration (in seconds)
  await client.setEx("message:2", 10, "This will expire in 10 seconds");

  const msg2 = await client.get("message:2");
  console.log("message:2 ->", msg2);


  /* ---------------- APPEND ---------------- */

  // Append string to existing value
  await client.append("message:1", " !!!");

  const appended = await client.get("message:1");
  console.log("After append ->", appended);


  /* ---------------- STRLEN ---------------- */

  // Get length of string value
  const length = await client.strLen("message:1");
  console.log("Length ->", length);


  /* ---------------- GETRANGE ---------------- */

  // Get substring (start, end)
  const sub = await client.getRange("message:1", 0, 4);
  console.log("Substring ->", sub);


  /* ---------------- SETRANGE ---------------- */

  // Overwrite part of the string starting at offset
  await client.setRange("message:1", 6, "Redis");

  const updated = await client.get("message:1");
  console.log("After setRange ->", updated);


  /* ---------------- INCR / DECR ---------------- */

  // Increment integer value
  await client.set("counter", 10);
  await client.incr("counter");
  await client.incrBy("counter", 5);

  const counter = await client.get("counter");
  console.log("Counter ->", counter);

  // Decrement integer value
  await client.decr("counter");
  await client.decrBy("counter", 3);

  console.log("Counter after decr ->", await client.get("counter"));


  /* ---------------- MSET / MGET ---------------- */

  // Set multiple keys at once
  await client.mSet({
    user: "Babin",
    role: "admin",
    lang: "JS"
  });

  // Get multiple keys at once
  const values = await client.mGet(["user", "role", "lang"]);
  console.log("MGET ->", values);


  /* ---------------- SETNX ---------------- */

  // Set only if key does NOT exist
  const isSet = await client.setNX("unique:key", "Only once");
  console.log("SETNX result ->", isSet); // 1 = success, 0 = already exists


  /* ---------------- GETSET ---------------- */

  // Get old value and set new value
  const oldValue = await client.getSet("message:1", "New Message");
  console.log("Old Value ->", oldValue);
  console.log("New Value ->", await client.get("message:1"));

}

init()
  .then(() => console.log("Redis string commands executed"))
  .catch((error) => console.error("Error :", error));
