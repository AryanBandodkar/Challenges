export function solve_15_graceful_shutdown_signal_handling() {
  const server = {
    closed: false,

    close(callback) {
      this.closed = true;
     
      if (callback) {
        callback();
      }
    }
  };

  let shuttingDown = false;

  function shutdown() {
    if (shuttingDown) {
      return;
    }

    shuttingDown = true;

    server.close(() => {
      // Server has been closed gracefully.
      // Cleanup
    });
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  return {
    server,
    shutdown
  };
}
