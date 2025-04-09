import { test, expect } from "./headerText";
import { TodosPO } from "../page-objects/Todos";

const itemOne = "Test 1";
const itemTwo = "Test 2";
const itemThree = "Test 3";
let todos: TodosPO;
test.describe("Delete todo item", () => {
  test.beforeEach(async ({ page }) => {
    todos = new TodosPO(page);
  });
  test("Delete one todo item and verify it no longer appears.", async ({
    verifyTodosHeading,
  }) => {
    await verifyTodosHeading();
    await todos.addNewTodoItem(itemOne);
    await expect(todos.getTodoItemByText(itemOne)).toBeVisible();
    await todos.deleteItems(itemOne);
  });

  test("Delete multiple todo item and verify they no longer appears.", async ({
    verifyTodosHeading,
  }) => {
    await verifyTodosHeading();
    await todos.addNewTodoItem(itemOne);
    await expect(todos.getTodoItemByText(itemOne)).toBeVisible();

    await todos.addNewTodoItem(itemTwo);
    await expect(todos.getTodoItemByText(itemTwo)).toBeVisible();

    await todos.addNewTodoItem(itemThree);
    await expect(todos.getTodoItemByText(itemThree)).toBeVisible();

    await todos.deleteItems();
    await expect(todos.todoItem).toHaveCount(0);
  });
});
