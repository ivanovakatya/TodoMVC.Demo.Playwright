import { test, expect } from "./headerText";
import { TodosPO } from "../page-objects/Todos";

const itemOne = "Test 1";
let todos: TodosPO;
const itemTwo = "Test 2";

test.describe("Filtering functionality", () => {
  test.beforeEach(async ({ page }) => {
    todos = new TodosPO(page);
  });
  test("Filtering all / active / completed / clear completed functionality", async ({
    verifyTodosHeading,
  }) => {
    await verifyTodosHeading();

    await todos.addNewTodoItem(itemOne);
    await todos.addNewTodoItem(itemTwo);
    await todos.allLink.click();
    await expect(todos.getTodoItemByText(itemOne)).toBeVisible();
    await expect(todos.getTodoItemByText(itemTwo)).toBeVisible();

    await todos.markAsDoneFirstTodos.first().check();
    await todos.verifyTodoItemClass(itemOne, "completed");
    await expect(todos.getTodoItemByText(itemTwo)).toBeVisible();

    await todos.activeLink.click();
    await expect(todos.getTodoItemByText(itemOne)).toBeHidden();
    await expect(todos.getTodoItemByText(itemTwo)).toBeVisible();

    await todos.completedLink.click();
    await expect(todos.getTodoItemByText(itemOne)).toBeVisible();
    await expect(todos.getTodoItemByText(itemTwo)).toBeHidden();

    await todos.clearCompletedLink.click();
    await expect(todos.clearCompletedLink).toBeHidden();

    await todos.activeLink.click();
    await expect(todos.getTodoItemByText(itemTwo)).toBeVisible();
  });
});
