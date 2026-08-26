import fs from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";

export async function solve_02_fs_stream_buffer_operations() {
  const filePath = "./stream-buffer-demo.txt";
  const data = Buffer.from("Hello from a Node.js stream");

  await pipeline(
    Readable.from([data]),
    fs.createWriteStream(filePath)
  );

  const chunks = [];

  await pipeline(
    fs.createReadStream(filePath),
    async function* (source) {
      for await (const chunk of source) {
        chunks.push(chunk);
      }
    }
  );

  return Buffer.concat(chunks);
}