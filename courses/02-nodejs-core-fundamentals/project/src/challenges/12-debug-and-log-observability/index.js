export function solve_12_debug_and_log_observability() {
  const operation = "user-login";

  console.info("Operation started", {
    operation
  });

  const success = true;

  if (success) {
    console.info("Operation completed", {
      operation,
      status: "success"
    });
  } else {
    console.warn("Operation failed", {
      operation,
      status: "failed"
    });
  }

  return {
    operation,
    success
  };
}
