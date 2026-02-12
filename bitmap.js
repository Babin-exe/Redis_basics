import client from "./client.js";
async function bitmap() {
  //Put bits in the bitmap
  // setBit("bitmapname:key",index to put at , what to set(0 or 1));
  //   console.log("This happened: ", await client.setBit("user:active", 7, 1));

  //Get the bit at particular index
  console.log("At the 7th bit : ", await client.getBit("user:active", 7)); //1
  console.log("At the 6th bit : ", await client.getBit("user:active", 6)); //0

  //see how many bits are set
  console.log("Total set bit : ", await client.bitCount("user:active"));
}

bitmap()
  .then(() => {
    console.log("Bitmap function is running");
  })
  .catch((error) => {
    console.error("Error: ", error);
  });
