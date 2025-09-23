import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine  = ({ text, count }) => <tr><td>{text}</td><td>{count}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
    const allFeedback = () => good + neutral + bad

    const averageFeedback = () => {
      // good = 1, neutral = 0, bad = -1, so good * 1 + neutral * 0 + bad * (-1)
      return (good - bad) / (good + neutral + bad)
    }

    const positiveFeedback = () => good * 100 / (good + neutral + bad) + " %"

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" count={good} />
        <StatisticLine text="neutral" count={neutral} />
        <StatisticLine text="bad" count={bad} />
        <StatisticLine text="all" count={allFeedback()} />
        <StatisticLine text="average" count={averageFeedback()} />
        <StatisticLine text="positive" count={positiveFeedback()} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
