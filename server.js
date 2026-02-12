import express from "express";
import axios from "axios";
import cors from "cors";
import client from "./client.js";
const app = express();

const PORT = 4000;

app.use(cors());

app.listen(PORT, () => {
  console.log(`Express is running at port : ${PORT}`);
});

app.get("/", async (req, res) => {
  try {
    const cached_value = await client.get("todos");

    if (cached_value) {
      return res
        .status(200)
        .json({ success: true, data: JSON.parse(cached_value) });
    }

    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    await client.set("todos", JSON.stringify(data), {
      EX: 60,
    });

    return res.json({ success: true, data: data });
  } catch (err) {
    console.error("Error: ", err);
    return res.status(500).json({
      success: false,
      message: err.mes,
    });
  }
});
