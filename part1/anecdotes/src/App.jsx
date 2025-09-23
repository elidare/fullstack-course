import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Anecdote = ({ header, text, vote }) => {
  return (
    <div>
      <h1>{header}</h1>
      <p>{text}</p>
      <p>has {vote} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNext = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const getAnecdoteIndex = () => {
    // One-liner https://stackoverflow.com/a/30850912
    return votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  }

  return (
    <div>
      <Anecdote header="Anecdote of the day" text={anecdotes[selected]} vote={votes[selected]} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleNext} text="next anecdote" />
      <Anecdote header="Anecdote with most votes" text={anecdotes[getAnecdoteIndex()]} vote={votes[getAnecdoteIndex()]} />
    </div>
  )
}

export default App
