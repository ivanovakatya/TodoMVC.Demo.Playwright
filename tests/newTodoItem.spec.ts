import { test, expect } from "./baseUrlHeaderFixture";
import { TodosPO } from "../page-objects/Todos";

const itemOne = "Test 1";
let todos: TodosPO;
test.describe("Add todo item", () => {
  test.beforeEach(async ({ page, baseUrlHeading }) => {
    todos = new TodosPO(page);
    await baseUrlHeading();
  });
  test("Add single new todo item and verify it appears in the list", async ({}) => {
    await todos.addNewTodoItem(itemOne);
    await todos.verifyTodoVisibility(itemOne, true);
    await expect(todos.getTodoItemByText(itemOne)).toHaveText(itemOne);
  });
});
