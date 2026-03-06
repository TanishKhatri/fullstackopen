import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (<p>No feedback given</p>)
  }

  function calcAverage() {
    return (good + bad*(-1)) / (good + neutral + bad);
  }

  function calcPostivePercentage() {
    return ((good/(good + neutral + bad)) * 100);
  }

  return (
    <>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {calcAverage()}</p>
      <p>positive {calcPostivePercentage()}%</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function setToGood(value) {
    return () => setGood(value)
  }

  function setToNeutral(value) {
    return () => setNeutral(value)
  }

  function setToBad(value) {
    return () => setBad(value)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={setToGood(good + 1)}>
        good
      </button>
      <button onClick={setToNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={setToBad(bad + 1)}>
        bad
      </button>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
