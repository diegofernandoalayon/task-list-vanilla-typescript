import {v4} from 'uuid'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import './style.css'


const taskForm = document.querySelector<HTMLFormElement>('#taskForm') // para indicar que el un elemento formulario

const tasksList = document.querySelector<HTMLDivElement>('#tasksList')

interface Task {
  title: string
  description: string,
  id: string
}

let tasks: Task[] = []

// creando tareas
taskForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  const title = taskForm['title'] as unknown as HTMLInputElement // para indicar que el un unknown y luege un elemento input de HTML
  
  const description = taskForm['description'] as unknown as HTMLTextAreaElement // para indicar que el elemento a seleccionar es un text area de HTML

  tasks.push({
    title : title.value,
    description: description.value,
    id: v4()
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
  Toastify({
    text: "Task added successfully",
    duration: 2500,
    close: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast()

  renderTasks(tasks) // para renderizar inmediatamente las tareas

  taskForm.reset() // para resetear todo el formulario
  title.focus() // para enfocar luego de guardar en la casilla del titulo
})
  //listando tareas

document.addEventListener('DOMContentLoaded', () => {

  tasks = JSON.parse(localStorage.getItem('tasks') || '[]') // pedimos al localStorage y si no asignamos array vacios, esto dara valores a el array tasks
  renderTasks(tasks)
})

function renderTasks(tasks: Task[]){
  
  tasksList!.innerHTML  = '' // ! para indicar que el elemento estara presente

  tasks.forEach((task) => {
    const taskElement = document.createElement('div')
    taskElement.className = 'bg-gray-900 p-4 mb-1 rounded-lg hover:bg-gray-700 cursor:pointer'

    const header = document.createElement('header')
    header.className = 'flex justify-between'

    const title = document.createElement('strong')
    title.innerText = task.title

    const btnDelete = document.createElement('button')
    btnDelete.className = 'bg-red-500 hover:bg-red-400 px-2 py-1 rounded-lg'
    btnDelete.innerText = 'Delete'
    // para eliminar una tarea
    btnDelete.addEventListener('click', () =>{
      const index = tasks.findIndex( t => t.id === task.id)
      tasks.splice(index, 1)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      renderTasks(tasks)
      Toastify({
        text: 'task deleted successfully',
        close:true,
        gravity: "bottom", // `top` or `bottom
        duration: 2500,
        style: {
          background: 'linear-gradient(to right, #FE4E00, #E9190F)'
        },
        className: 'bg-blue-800'
      }).showToast()
    })
    header.append(title)
    header.append(btnDelete) 

    const description = document.createElement('span')
    description.className = 'pl-4'
    description.innerText = task.description


    taskElement.append(header)
    taskElement.append(description)

    tasksList?.append(taskElement)
  })
}
