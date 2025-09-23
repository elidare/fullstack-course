import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Stats = ({ text, count }) => <p>{text} {count}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const allFeedback = () => good + neutral + bad

  const averageFeedback = () => {
    // good = 1, neutral = 0, bad = -1, so good * 1 + neutral * 0 + bad * (-1)
    return (good - bad) / (good + neutral + bad)
  }

  const positiveFeedback = () => good / (good + neutral + bad) + " %"

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Stats text="good" count={good} />
      <Stats text="neutral" count={neutral} />
      <Stats text="bad" count={bad} />
      <Stats text="all" count={allFeedback()} />
      <Stats text="average" count={averageFeedback()} />
      <Stats text="positive" count={positiveFeedback()} />
    </div>
  )
}

export default App
