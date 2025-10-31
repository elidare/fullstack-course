const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return await response.json()
}

export const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0, id: getId() }),
  }

  const response = await fetch(baseUrl, options)
  const data = await response.json()
  
  if (!response.ok) {
    const errorMessage = data.error || 'Failed to create anecdote'
    throw new Error(errorMessage)
  }
  
  return data
}

export const updateAnecdote = async (updatedAnecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote)
  }

  const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)

  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  return await response.json()
}
