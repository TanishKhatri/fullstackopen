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
      <StatisticLine text={'good'} value={good} />
      <StatisticLine text={'neutral'} value={neutral} />
      <StatisticLine text={'bad'} value={bad} />
      <StatisticLine text={'all'} value={good + neutral + bad} />
      <StatisticLine text={'average'} value={calcAverage()} />
      <StatisticLine text={'positive'} value={`${calcPostivePercentage()}%`}/> 
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return (<p>{text} {value}</p>)
}

const Button = ({onClick, text}) => {
  return (<button onClick={onClick}>{text}</button>)
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
      <Button onClick={setToGood(good + 1)} text={'good'}/>
      <Button onClick={setToNeutral(neutral + 1)} text={'neutral'}/>
      <Button onClick={setToBad(bad + 1)} text={'bad'}/>

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
