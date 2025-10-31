import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const handleVote = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 10))
  }

  return (
    <div>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote => (
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
