'use client'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [inputValue, setInputValue] = useState("")
  const [todos, setTodos] = useState([])


  //kontinuierliches fetchen der liste
  useEffect(() => {
    fetch('/api/todos')
    .then(response => response.json())
    .then(data => setTodos(data))
    .catch(error => console.log('Fehler beim Abrufen der API'))
  })

  const handleInput = (e) => {
    const value = e.target.value
    setInputValue(value)
  }


  //funktion zum hinzufuegen eines eintrags
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!inputValue.trim()) {
      console.error('Input darf nicht leer sein');
      return;
    }
      const newTodo = {
        description: inputValue
      };

      try {
        const response = await fetch('/api/newtodo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTodo)
        })
      } catch (error) {
        console.error('Problem beim Fetch POST new Todo', error)
    }

    setInputValue('')
  }

  //funktion zum loeschen aller eintraege
  const handleClear = async() => {
    try {
      const response = await fetch('/api/clearList',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error('Fehler beim POST clearList')
    }
  }


  //funktion zum loeschen einzelner eintraege
  const deleteTodo = async(id) => {
    try {
      const response = await fetch('/api/deleteTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
    } catch (error) {
      console.error('Fehler beim Loeschen', error)
    }
  }


  
  return (
   <main className='w-[500px] h-screen flex flex-col mx-auto overflow-hidden'>

    {/* Top Item */}
    <div className='m-3 flex flex-col p-4 bg-white border rounded-md shadow-lg sticky top-0 z-10'>
    <h1 className='text-5xl font-bold p-4 my-2 text-center'>My Todo App</h1>
    <div className='flex flex-col border rounded-lg p-4 gap-4 shadow-md'>
      <input type='text' placeholder='your todo'
      onInput={handleInput}
      value={inputValue}
      className='border p-4 rounded-lg'></input>
      <div className='w-full grid grid-cols-2'>
      <button className='text-white bg-black border px-2 py-2 m-2 rounded-full hover:shadow-lg transition duration-150'
      onClick={handleSubmit}>Add Todo</button>
      <button className='text-white bg-black border px-2 py-2 m-2  rounded-full hover:shadow-lg transition duration-150'
      onClick={handleClear}>Clear List</button>
      </div>
    </div>
    </div>

    {/* List */}
    <div className='flex-1 overflow-auto text-center p-4'>
      <ul className='text-lg font-thin space-y-3'>
        {
        todos.map(todo => 
        <div className=''>
        <li key={todo.id}
        className='flex border rounded-full py-2 px-4 items-center justify-between'>{todo.description}
        <button 
         onClick={() => deleteTodo(todo.id)} 
        className='border rounded-full text-white bg-black hover:shadow-md transition duration-100 px-4 py-2'>Delete</button>
        </li>
        </div>
        )}
      </ul>
    </div>
   </main>
  )
}
