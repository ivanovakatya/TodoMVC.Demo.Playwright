import { test, expect } from "./headerText";
import { TodosPO } from "../page-objects/Todos";

const itemOne = "Test 1";
const itemTwo = "Test 2";
const itemThree = "Test 3";
const itemFour = "Test 4";

let todos: TodosPO;
test.describe("Counter updates correctly", () => {
  test.beforeEach(async ({ page }) => {
    todos = new TodosPO(page);
  });
  test("Verify that the counter updates correctly after adding and deleting todo items.", async ({
    verifyTodosHeading,
  }) => {
    await verifyTodosHeading();

    await todos.addNewTodoItem(itemOne);
    await expect(todos.todoCount).toHaveText("1");
    await todos.addNewTodoItem(itemTwo);
    await expect(todos.todoCount).toHaveText("2");
    await todos.addNewTodoItem(itemThree);
    await expect(todos.todoCount).toHaveText("3");
    await todos.addNewTodoItem(itemFour);
    await expect(todos.todoCount).toHaveText("4");
    await todos.deleteItems(itemOne);
    await expect(todos.todoCount).toHaveText("3");
    await todos.deleteItems(itemTwo);
    await expect(todos.todoCount).toHaveText("2");
    await todos.deleteItems(itemThree);
    await expect(todos.todoCount).toHaveText("1");
    await todos.deleteItems(itemFour);
    await expect(todos.todoCount).toBeHidden();
  });

  test("Mark a todo item as completed and and verify count update correctly", async ({
    verifyTodosHeading,
  }) => {
    await verifyTodosHeading();

    await todos.addNewTodoItem(itemOne);
    await todos.markAsDoneFirstTodos.check();
    await expect(todos.todoCount).toHaveText("0");
  });
  test("Mark todo items as completed and verify count update correctly", async ({
    verifyTodosHeading,
  }) => {
    await verifyTodosHeading();

    await todos.addNewTodoItem(itemOne);
    await todos.addNewTodoItem(itemTwo);
    await todos.markAllAsDone.click();
    await expect(todos.todoCount).toHaveText("0");
  });
});
