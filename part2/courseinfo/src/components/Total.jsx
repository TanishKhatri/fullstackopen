const Total = ({parts}) => {
  return (
    <div><strong>total of {parts.reduce((acc, curr) => acc += curr.exercises, 0)} exercises</strong></div>
  )
}

export default Total