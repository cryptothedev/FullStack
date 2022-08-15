//app.js
import React from 'react'
import './App.css';
import Axios from 'axios'
import { useState } from 'react'

function App() {
  
  const [input,setInput] = useState("");
  const [todos,setTodos] = useState([]);
  const [editTodos,seteditTodos] = useState("");

  const getTodos = () => {
    Axios.get(`https://todo-list-crud-api-jk.herokuapp.com/`).then((response)=> {
      setTodos(response.data);
    });
  };

  const getInput = () => {
    Axios.post(`https://todo-list-crud-api-jk.herokuapp.com/addtodos`,{
      input: input
    })
  };
  
  const completetodos = (taskid) => {
    Axios.put(`https://todo-list-crud-api-jk.herokuapp.com/complete/${taskid}`)
  }

  const deletetodos = (taskid) => {
    Axios.delete(`https://todo-list-crud-api-jk.herokuapp.com/deletetodos/${taskid}`)
  }

  const editclick = (taskid) => {
    Axios.put(`hhttps://todo-list-crud-api-jk.herokuapp.com/editclick/${taskid}`)
  }

  const editsumbit = (taskid) => {
    Axios.put(`https://todo-list-crud-api-jk.herokuapp.com/editsumbit/${taskid}`,{
      editTodos: editTodos
    })
  }

  return ( 
    <div className='container'>
      <div className='app-wrapper'>
          <div className='header'><h2>Todolist</h2></div>
          <div >
              <form>
              <input type="text" className='task-input'
              placeholder = "List your todo here..."
              onChange={(event)=>{
                setInput(event.target.value)
              }}
              />
              <button className='button-add' type='submit'
              onClick={getInput}>sumbit</button>
              </form>
          </div>
          

            <div>
              {getTodos()}
              {todos.map((val)=>{
                return(
                      <li className='list-item'>
                        {val.editON % 2 === 0 
                        ? 
                        <div>
                        <p className={val.complete % 2 === 0 ?'list':'complete list'}>
                        {val.tasks}</p>  
                        </div>
                        :  
                        <div>
                        <input className='list' type="text" 
                        placeholder = {val.tasks}
                        onChange={(event)=>{
                          seteditTodos(event.target.value)}
                        }
                        >
                        </input>
                        </div>                        
                        }
                        {val.editON % 2 === 0 ? 
                      <div>
                      <button className='button-complete'
                       onClick={()=>{completetodos(val.taskid)}}>
                       <i class="fa-regular fa-circle-check"></i>
                       </button>
                       <button className='button-edit'
                       onClick={()=>{editclick(val.taskid)}}>
                       <i class="fa-regular fa-pen-to-square"></i>
                       </button>
                       <button className='button-delete'
                       onClick={()=>{deletetodos(val.taskid)}}>
                       <i class="fa-regular fa-trash-can"></i>
                       </button>
                       </div>
                       : 
                       <button className='button-editsumbit'
                       type='submit'
                       onClick={()=>{editsumbit(val.taskid)}}>
                       <i class="fa-solid fa-pen-to-square"></i>
                       </button>
                        }
                       
                      </li>
                )
              })}
            </div>

          
      </div>
    </div>
  );


}

export default App;
