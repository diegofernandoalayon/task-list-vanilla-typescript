import './style.css'

const taskForm = document.querySelector<HTMLFormElement>('#taskForm') // para indicar que el un elemento formulario

taskForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  const title = taskForm['title'] as unknown as HTMLInputElement // para indicar que el un unknown y luege un elemento input de HTML
  
  const description = taskForm['description'] as unknown as HTMLTextAreaElement // para indicar que el elemento a seleccionar es un text area de HTML

  console.log(title.value, description.value)
})