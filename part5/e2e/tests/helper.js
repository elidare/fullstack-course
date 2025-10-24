const loginWith = async (page, username, password)  => {
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Log in' }).click()
}

const createBlog = async (page, newBlog) => {
  await page.getByRole('button', { name: 'Create new blog' }).click()
  await page.getByLabel('Title').fill(newBlog.title)
  await page.getByLabel('Author').fill(newBlog.author)
  await page.getByLabel('Url').fill(newBlog.url)
  await page.getByRole('button', { name: 'Create' }).click()
}

export { loginWith, createBlog }
