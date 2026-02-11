import client from "./client.js";

// Dummy email function
async function sendEmail(email) {
  console.log("Sending email to:", email);
  return true;
}

async function stream() {
  // Add a test message
  await client.xAdd("email-stream", "*", {
    type: "WELCOME_EMAIL",
    userId: "123",
    email: "babin@example.com",
  });

  // Create consumer group if it doesn't exist
  try {
    await client.xGroupCreate("email-stream", "email-group", "0", {
      MKSTREAM: true,
    });
  } catch (err) {
    if (!err.message.includes("BUSYGROUP")) throw err;
    console.log("Consumer group already exists");
  }

  // Worker function
  async function startWorker(workerName) {
    while (true) {
      const response = await client.xReadGroup(
        "email-group",
        workerName,
        {
          key: "email-stream",
          id: ">",
        },
        {
          COUNT: 1,
          BLOCK: 5000,
        }
      );

      if (!response) continue;

      const message = response[0].messages[0];
      const messageId = message.id;
      const data = message.message;

      try {
        await sendEmail(data.email);

        // ACK after successful processing
        await client.xAck("email-stream", "email-group", messageId);
        console.log("Email sent and ACKed:", data.email);
      } catch (err) {
        console.error("Email failed for:", data.email);
      }
    }
  }

  // Start worker
  await startWorker("worker-1");
}

stream()
  .then(() => console.log("Stream function is running"))
  .catch((error) => console.error("Error", error));
