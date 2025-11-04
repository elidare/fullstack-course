import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "Name of the blog",
  author: "Author of the blog",
  url: "url.url",
  likes: 0,
  user: {
    username: "username",
    name: "User name",
    id: "userid12345",
  },
  id: "blogid12345",
};

describe("<Blog />", () => {
  test("Renders blog in closed status", () => {
    render(<Blog blog={blog} />);

    const element = screen.getByText(`${blog.title} ${blog.author}`);
    expect(element).toBeVisible();

    const urlElement = screen.queryByText(`${blog.url}`);
    expect(urlElement).toBeNull();

    const likesElement = screen.queryByText(`Likes ${blog.likes}`);
    expect(likesElement).toBeNull();
  });

  test("Renders blog in open status", async () => {
    render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);

    const element = screen.getByText(`${blog.title} ${blog.author}`);
    expect(element).toBeVisible();

    const urlElement = screen.getByText(`${blog.url}`, { exact: false });
    expect(urlElement).toBeVisible();

    const likesElement = screen.getByText(`Likes ${blog.likes}`, {
      exact: false,
    });
    expect(likesElement).toBeVisible();
  });

  test("Likes twice", async () => {
    const mockHandler = vi.fn();

    render(<Blog blog={blog} updateBlog={mockHandler} />);

    const user = userEvent.setup();
    const viewButton = screen.getByText("View");
    await user.click(viewButton);

    const likeButton = screen.getByText("Like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
