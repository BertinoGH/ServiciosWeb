import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log(props)
  return<div>
    <h1>{props.course.name}</h1> 
  </div> 
  }

const Content = (props) => {
    console.log(props)
    return <h1>{props.parts[parts(0)]}</h1>
    }

const Total = (props) => {
      console.log(props)
      return <h1>{props.total}</h1>
      }
const parts = (props) => {
        console.log(props)
        return <h1>{props.name} {props.exercises}</h1>
        }


  const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
      {
      name: 'Fundamentals of React',
      exercises: 10
      },
      {
      name: 'Using props to pass data',
      exercises: 7
      },
      {
      name: 'State of a component',
      exercises: 14
      }
      ]
      }
    return (
      <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
      </div>
      )
      }
    

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
