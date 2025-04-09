import { Locator, Page, expect } from "@playwright/test";

export class TodosPO {
  page: Page;
  newTodo: Locator;
  todoCount: Locator;
  todoItem: Locator;
  deleteButton: Locator;
  markAsDoneFirstTodos: Locator;
  completedLink: Locator;
  markAllAsDone: Locator;
  allLink: Locator;
  activeLink: Locator;
  clearCompletedLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodo = this.page.locator(
      'input[placeholder="What needs to be done?"]'
    );
    this.todoCount = this.page.getByTestId("todo-count");
    this.todoItem = this.page.locator(
      'ul.todo-list li[data-testid="todo-item"]'
    );
    this.markAsDoneFirstTodos = this.page.getByRole("checkbox", {
      name: "Toggle Todo",
    });
    this.completedLink = this.page.locator(
      'footer ul li a[href="#/completed"]'
    );
    this.markAllAsDone = this.page.getByText("Mark all as complete");
    this.todoCount = this.page.locator('[data-testid="todo-count"] strong');
    this.allLink = this.page.locator("footer ul li a", { hasText: "All" });
    this.activeLink = this.page.locator("footer ul li a", {
      hasText: "Active",
    });
    this.clearCompletedLink = this.page.locator("button.clear-completed");
  }
  getTodoItemByText(itemText: string): Locator {
    return this.page.getByText(itemText);
  }
  async addNewTodoItem(itemText: string) {
    await this.newTodo.waitFor({ state: "visible" });
    this.newTodo.fill(itemText);
    this.newTodo.press("Enter");
  }

  async deleteItems(itemText?: string) {
    if (itemText) {
      const todoItem = this.todoItem.filter({ hasText: itemText });
      await todoItem.hover();
      const deleteButton = todoItem.locator('button[aria-label="Delete"]');
      await deleteButton.click();
      await expect(todoItem).not.toBeVisible();
    } else {
      const count = await this.todoItem.count();
      for (let i = count - 1; i >= 0; i--) {
        const item = this.todoItem.nth(i);
        await item.hover();
        const deleteButton = item.locator('button[aria-label="Delete"]');
        await deleteButton.click();
      }
    }
  }
  async verifyTodoItemClass(itemText: string, expectedClass: string) {
    const todoItem = this.todoItem.filter({ hasText: itemText });
    await expect(todoItem).toHaveClass(new RegExp(expectedClass));
  }
}
