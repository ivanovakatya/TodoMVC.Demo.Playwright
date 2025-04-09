import { test, expect } from "./baseUrlHeaderFixture";
import { TodosPO } from "../page-objects/Todos";

const itemOne = "Test 1";
const itemTwo = "Test 2";
const itemThree = "Test 3";
const itemFour = "Test 4";

let todos: TodosPO;
test.describe("Counter updates correctly", () => {
  test.beforeEach(async ({ page, baseUrlHeading }) => {
    todos = new TodosPO(page);
    await baseUrlHeading();
  });
  test("Verify that the counter updates correctly after adding and deleting multiple todo items.", async ({}) => {
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

  test("Verify that the counter updates correctly after marking todo item as completed and verify count update correctly", async ({}) => {
    await todos.addNewTodoItem(itemOne);
    await todos.addNewTodoItem(itemTwo);
    await expect(todos.todoCount).toHaveText("2");
    await todos.markAsDoneFirstTodos.first().check();
    await expect(todos.todoCount).toHaveText("1");
  });
  test("Verify that the counter updates correctly after marking single todo item as completed", async ({}) => {
    await todos.addNewTodoItem(itemOne);
    await todos.markAsDoneFirstTodos.check();
    await expect(todos.todoCount).toHaveText("0");
  });
  test("Verify that the counter updates correctly after marking multiples todo items as completed and verify count update correctly", async ({}) => {
    await todos.addNewTodoItem(itemOne);
    await todos.addNewTodoItem(itemTwo);
    await todos.markAllAsDone.click();
    await expect(todos.todoCount).toHaveText("0");
  });
});
