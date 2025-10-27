import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const createAnecdote = content => {
    return {
      type: 'CREATE',
      payload: { content }
    }
  }

  const voteAnecdote = id => {
    return {
      type: 'VOTE',
      payload: { id }
    }
  }

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
  }

  const vote = id => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
