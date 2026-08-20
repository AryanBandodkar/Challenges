import { spawn } from "node:child_process";
export function solve_04_process_worker_lifecycle() {
  const message = process.env.WORKER_MESSAGE || process.argv[2] || "Hello";

  const worker = spawn(
    process.execPath,
    ["-e", `console.log(${JSON.stringify(message)})`]
  );

  worker.on("spawn", () => {
    // Child process started.
  });

  worker.on("exit", (code, signal) => {
    // Child process finished.
  });

  return {
    message,
    pid: worker.pid
  };
}
