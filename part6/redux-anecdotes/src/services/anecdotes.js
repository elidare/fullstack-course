const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0, id: getId() }),
  }

  const response = await fetch(baseUrl, options)
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

const vote = async (anecdote) => {
  const votedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(votedAnecdote),
  }

  const response = await fetch(`${baseUrl}/${anecdote.id}`, options)
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

export default { getAll, createNew, vote }
