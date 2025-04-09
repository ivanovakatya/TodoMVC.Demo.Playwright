import { test } from "./baseUrlHeaderFixture";
import { TodosPO } from "../page-objects/Todos";

const itemOne = "Test 1";
const itemTwo = "Test 2";
let todos: TodosPO;
test.describe("Mark todo item as completed", () => {
  test.beforeEach(async ({ page, baseUrlHeading }) => {
    todos = new TodosPO(page);
    await baseUrlHeading();
  });
  test("Mark a todo item as completed and verify its status using item checkbox", async ({}) => {
    todos.addNewTodoItem(itemOne);
    await todos.markAsDoneFirstTodos.check();
    await todos.verifyTodoItemClass(itemOne, "completed");
    await todos.completedLink.click();
    await todos.verifyTodoVisibility(itemOne, true);
  });

  test("Mark a todo items as completed and verify its status using mark all", async ({}) => {
    await todos.addNewTodoItem(itemOne);
    await todos.addNewTodoItem(itemTwo);
    await todos.markAllAsDone.click();
    await todos.verifyTodoItemClass(itemOne, "completed");
    await todos.verifyTodoItemClass(itemTwo, "completed");
    await todos.completedLink.click();
    await Promise.all([
      await todos.verifyTodoVisibility(itemOne, true),
      await todos.verifyTodoVisibility(itemTwo, true),
    ]);
  });
});
