import { createClient } from "redis";

async function pubSub() {
  const sub1 = createClient({ url: "redis://localhost:6379" });
  const sub2 = createClient({ url: "redis://localhost:6379" });
  const sub3 = createClient({ url: "redis://localhost:6379" });

  const pub1 = createClient({ url: "redis://localhost:6379" });
  const pub2 = createClient({ url: "redis://localhost:6379" });

  await sub1.connect();
  await sub2.connect();
  await sub3.connect();

  await pub1.connect();
  await pub2.connect();

  await sub1.subscribe("chat", (chat) => {
    console.log("Subscriber 1 got : ", chat);
  });

  await sub2.subscribe("chat", (chat) => {
    console.log("Subscribe 2 got : ", chat);
  });

  await sub3.subscribe("chat", (chat) => {
    console.log("Subscriber 3 got : ", chat);
  });

  pub1.publish("chat", "This is publisher 1 putting some value");
  pub2.publish("chat", "Publisher 2 says hello");
}

pubSub()
  .then(() => {
    console.log("Pub sub function is running");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
