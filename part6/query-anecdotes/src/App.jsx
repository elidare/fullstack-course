import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({
      type: 'SHOW',
      payload: `You voted for "${anecdote.content}"`,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'HIDE' })
    }, 5000)
  }

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id !== newAnecdote.id ? a : newAnecdote))
    }
  })

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.error) {
    return <div>Anecdote server unavailable</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
