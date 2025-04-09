import { test, expect } from "./headerText";
import { TodosPO } from "../page-objects/Todos";

const itemOne = "Test 1";
let todos: TodosPO;
test.describe("Add todo item", () => {
  test.beforeEach(async ({ page }) => {
    todos = new TodosPO(page);
  });
  test("Add a new todo item and verify it appears in the list", async ({
    verifyTodosHeading,
  }) => {
    await verifyTodosHeading();

    await todos.addNewTodoItem(itemOne);
    await expect(todos.getTodoItemByText(itemOne)).toBeVisible();
    await expect(todos.getTodoItemByText(itemOne)).toHaveText(itemOne);
  });
});
