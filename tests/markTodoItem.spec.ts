import { test, expect } from "./headerText";
import { TodosPO } from "../page-objects/Todos";

const itemOne = "Test 1";
const itemTwo = "Test 2";
let todos: TodosPO;
test.describe("Mark todo item as completed", () => {
  test.beforeEach(async ({ page }) => {
    todos = new TodosPO(page);
  });
  test("Mark a todo item as completed and verify its status using item checkbox", async ({
    verifyTodosHeading,
  }) => {
    await verifyTodosHeading();

    todos.addNewTodoItem(itemOne);
    await todos.markAsDoneFirstTodos.check();
    await todos.completedLink.click();
    await expect(todos.getTodoItemByText(itemOne)).toBeVisible();
  });

  test("Mark a todo items as completed and verify its status using mark all", async ({
    verifyTodosHeading,
  }) => {
    await verifyTodosHeading();

    await todos.addNewTodoItem(itemOne);
    await todos.addNewTodoItem(itemTwo);
    await todos.markAllAsDone.click();
    await todos.completedLink.click();
    await Promise.all([
      expect(todos.getTodoItemByText(itemOne)).toBeVisible(),
      expect(todos.getTodoItemByText(itemTwo)).toBeVisible(),
    ]);
  });
});
