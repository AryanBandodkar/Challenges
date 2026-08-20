export function solve_11_operational_vs_programmer_errors() {
  function classifyError(error) {
    if (error instanceof TypeError) {
      return "programmer";
    }

    return "operational";
  }

  function recoverableOperation() {
    throw new Error("Operational failure");
  }

  try {
    recoverableOperation();

    return {
      success: true,
      errorType: null,
      message: "Operation completed successfully"
    };
  } catch (error) {
    const errorType = classifyError(error);

    if (errorType === "operational") {
      return {
        success: false,
        errorType: "operational",
        message: "Recoverable operational failure"
      };
    }

    throw error;
  }
}
