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

    await todos.verifyTodoVisibility(itemOne, true);
    await todos.verifyTodoVisibility(itemTwo, true);

    await todos.markAsDoneFirstTodos.first().check();
    await todos.verifyTodoItemClass(itemOne, "completed");
    await todos.verifyTodoVisibility(itemTwo, true);

    await todos.activeLink.click();
    await todos.verifyTodoVisibility(itemOne, false);
    await todos.verifyTodoVisibility(itemTwo, true);

    await todos.completedLink.click();
    await todos.verifyTodoVisibility(itemOne, true);
    await todos.verifyTodoVisibility(itemTwo, false);

    await todos.clearCompletedLink.click();
    await expect(todos.clearCompletedLink).toBeHidden();

    await todos.activeLink.click();
    await todos.verifyTodoVisibility(itemTwo, true);
  });
});
