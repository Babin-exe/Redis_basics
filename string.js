import client from "./client.js";

async function init() {
  /* ---------------- BASIC SET / GET ---------------- */
  await client.set("message:1", "Hello Redis");
  console.log("message:1 ->", await client.get("message:1"));

  /* ---------------- SET WITH TTL ---------------- */
  // ioredis: set key with TTL in seconds
  await client.set("message:2", "This will expire in 10 seconds", "EX", 10);
  console.log("message:2 ->", await client.get("message:2"));

  /* ---------------- APPEND ---------------- */
  await client.append("message:1", " !!!");
  console.log("After append ->", await client.get("message:1"));

  /* ---------------- STRLEN ---------------- */
  const length = await client.call("STRLEN", "message:1");
  console.log("Length ->", length);

  /* ---------------- GETRANGE ---------------- */
  const sub = await client.call("GETRANGE", "message:1", 0, 4);
  console.log("Substring ->", sub);

  /* ---------------- SETRANGE ---------------- */
  await client.call("SETRANGE", "message:1", 6, "Redis");
  console.log("After setRange ->", await client.get("message:1"));

  /* ---------------- INCR / DECR ---------------- */
  await client.set("counter", "10");
  await client.incr("counter");
  await client.incrby("counter", 5);
  console.log("Counter ->", await client.get("counter"));

  await client.decr("counter");
  await client.decrby("counter", 3);
  console.log("Counter after decr ->", await client.get("counter"));

  /* ---------------- MSET / MGET ---------------- */
  await client.mset({
    user: "Babin",
    role: "admin",
    lang: "JS",
  });
  console.log("MGET ->", await client.mget("user", "role", "lang"));

  /* ---------------- SETNX ---------------- */
  const isSet = await client.setnx("unique:key", "Only once");
  console.log("SETNX result ->", isSet); // 1 = success, 0 = already exists

  /* ---------------- GETSET ---------------- */
  const oldValue = await client.call("GETSET", "message:1", "New Message");
  console.log("Old Value ->", oldValue);
  console.log("New Value ->", await client.get("message:1"));
}

init()
  .then(() => console.log("Redis string commands executed"))
  .catch((error) => console.error("Error :", error));
