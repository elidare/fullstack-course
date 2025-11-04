import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("Sends a created blog and calls onSubmit", async () => {
    const newBlog = {
      title: "New blog",
      author: "Blog author",
      url: "url.url",
    };
    const createBlog = vi.fn();
    const user = userEvent.setup();

    render(<BlogForm handleSubmit={createBlog} />);

    const inputTitle = screen.getByLabelText("Title");
    const inputAuthor = screen.getByLabelText("Author");
    const inputUrl = screen.getByLabelText("Url");
    const createButton = screen.getByText("Create");

    await user.type(inputTitle, newBlog.title);
    await user.type(inputAuthor, newBlog.author);
    await user.type(inputUrl, newBlog.url);
    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title);
    expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author);
    expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url);
  });
});
