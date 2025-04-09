import { test, expect } from "./baseUrlHeaderFixture";
import { TodosPO } from "../page-objects/Todos";

const itemOne = "Test 1";
const itemTwo = "Test 2";
let todos: TodosPO;
test.describe("Filtering functionality", () => {
  test.beforeEach(async ({ page, baseUrlHeading }) => {
    todos = new TodosPO(page);
    await baseUrlHeading();
  });
  test("Filtering all / active / completed / clear completed functionality", async ({}) => {
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

    await todos.allLink.click();
    await todos.verifyTodoVisibility(itemTwo, true);
    await expect(todos.todoCount).toHaveText("1");
  });
});
