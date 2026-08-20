import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
export function solve_10_stream_based_transfer_service() {
  async function transfer(sourcePath, destinationPath) {
    await pipeline(
      createReadStream(sourcePath),
      createWriteStream(destinationPath)
    );

    return {
      success: true,
      source: sourcePath,
      destination: destinationPath
    };
  }

  return transfer;
}
