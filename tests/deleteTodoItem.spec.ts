import { test, expect } from "./baseUrlHeaderFixture";
import { TodosPO } from "../page-objects/Todos";

const itemOne = "Test 1";
const itemTwo = "Test 2";
const itemThree = "Test 3";
let todos: TodosPO;
test.describe("Delete todo item", () => {
  test.beforeEach(async ({ page, baseUrlHeading }) => {
    todos = new TodosPO(page);
    await baseUrlHeading();
  });
  test("Delete one todo item and verify it no longer appears.", async ({}) => {
    await todos.addNewTodoItem(itemOne);
    await todos.verifyTodoVisibility(itemOne, true);
    await todos.deleteItems(itemOne);
    await expect(todos.todoItem).toHaveCount(0);
  });

  test("Delete multiple todo item and verify they no longer appears.", async ({}) => {
    await todos.addNewTodoItem(itemOne);
    await todos.verifyTodoVisibility(itemOne, true);

    await todos.addNewTodoItem(itemTwo);
    await todos.verifyTodoVisibility(itemTwo, true);

    await todos.addNewTodoItem(itemThree);
    await todos.verifyTodoVisibility(itemThree, true);

    await todos.deleteItems();
    await expect(todos.todoItem).toHaveCount(0);
  });
});
