const validateQuery = require("../src/utils/validateQuery");

test("returns safe for harmless queries", () => {
  const { isSafe } = validateQuery("SELECT * FROM users;");
  expect(isSafe).toBe(true);
});

test("detects dangerous query (DROP)", () => {
  const result = validateQuery("DROP TABLE users;");
  expect(result.isSafe).toBe(false);
});
