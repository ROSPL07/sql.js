// Utility function to validate SQL queries before execution
// Helps prevent accidental destructive queries like DROP or DELETE.

function validateQuery(sqlQuery) {
  if (typeof sqlQuery !== "string") {
    throw new Error("Query must be a string.");
  }

  const dangerousCommands = ["DROP", "DELETE", "ALTER", "TRUNCATE"];
  const upperQuery = sqlQuery.toUpperCase();

  for (const cmd of dangerousCommands) {
    if (upperQuery.includes(cmd)) {
      return {
        isSafe: false,
        reason: `Query contains dangerous command: ${cmd}`,
      };
    }
  }

  return {
    isSafe: true,
    reason: "Query passed validation.",
  };
}

module.exports = validateQuery;

// Example usage (for testing):
// const { isSafe, reason } = validateQuery("SELECT * FROM users;");
// console.log(isSafe, reason);
