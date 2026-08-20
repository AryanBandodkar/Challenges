import fs from "node:fs";
import { pipeline } from "node:stream/promises";

export function solve_02_fs_stream_buffer_operations() {
  const readStream = fs.createReadStream("./source.txt");
  const writeStream = fs.createWriteStream("./copy.txt");

  const transfer = pipeline(readStream, writeStream);

  return transfer;
}
