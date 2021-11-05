let data = []
const formElem = document.querySelector('#form')
const listElem = document.querySelector('#list')

function handleSubmit(event) {
  event.preventDefault()

  const todo = {
    id: new Date().getTime(),
    isCheked: false,
  }

  const formData = new FormData(formElem)
  for (let [name, value] of formData.entries()) {
    todo[name] = value
  }
  data.push(todo)

  formElem.reset()

  render()
}

function handleChange(event) {
  const { target } = event
  const { id, checked } = target

  data.forEach((item) => {
    if (item.id == id) {
      item.isChecked = checked
    }
  })
}

function handleBeforeUnload() {
  const json = JSON.stringify(data)
  localStorage.setItem('data', json)
}

function handleAfterReload() {
  const dataStorage = localStorage.getItem('data')

  if (dataStorage) {
    data = JSON.parse(dataStorage)

    render()
  }
}

function handleclickDelBtn(event) {
  const { role, id } = event.target.dataset

  if (role == 'delete') {
    data = data.filter((item) => item.id != id)

    render()
  }
}

//  -----------------------------------------------------------------------------

function createTodoTemplate({ id, todo_content, isChecked }) {
  const checkedAttr = isChecked ? 'checked' : ''
  const template = `
  <li class="todo__item d-flex p-2 border border-1 rounded-3">
    <div class="form-check form-check-lg d-flex align-items-center">
      <input class="form-check-input mt-0 me-2" ${checkedAttr} type="checkbox" id="${id}">
      <label class="form-check-label" for="${id}">${todo_content}</label>
    </div>
    <button type="button" data-role="delete" data-id="${id}" class="btn btn-sm btn-danger ms-auto">
      Удалить <i class="fas fa-trash-alt"></i>
    </button>
  </li>
`
  return template
}

function createTodoElements() {
  let result = ''

  data.forEach((todo) => {
    result = result + createTodoTemplate(todo)
  })

  return result
}

function render() {
  const todoElements = createTodoElements()
  listElem.innerHTML = todoElements
}

formElem.addEventListener('submit', handleSubmit)
listElem.addEventListener('change', handleChange)
listElem.addEventListener('click', handleclickDelBtn)
window.addEventListener('beforeunload', handleBeforeUnload)
window.addEventListener('DOMContentLoaded', handleAfterReload)
