// Minimal external JS: add, drag/drop, delete, localStorage
(function(){
  const input = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-todo');
  const todoListEl = document.getElementById('todo-list');
  const doneListEl = document.getElementById('done-list');
  const countTodo = document.getElementById('count-todo');
  const countDone = document.getElementById('count-done');

  const STORAGE_KEY = 'dd_todos_v1';
  let tasks = [];

  function load(){ try{ tasks = JSON.parse(localStorage.getItem(STORAGE_KEY))||[] }catch(e){ tasks=[] } }
  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) }
  function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2,7) }

  function createTaskElement(task){
    const li = document.createElement('li');
    li.className = 'task';
    li.draggable = true;
    li.dataset.id = task.id;

    const span = document.createElement('div');
    span.className = 'text';
    span.textContent = task.text;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const del = document.createElement('button');
    del.className = 'btn-delete';
    del.title = 'Hapus';
    del.innerText = '×';
    del.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      save(); render();
    });

    actions.appendChild(del);
    li.appendChild(span);
    li.appendChild(actions);

    li.addEventListener('dragstart', (e)=>{ e.dataTransfer.setData('text/plain', task.id); li.classList.add('dragging') });
    li.addEventListener('dragend', ()=> li.classList.remove('dragging'));

    return li;
  }

  function render(){
    todoListEl.innerHTML = '';
    doneListEl.innerHTML = '';

    const todoTasks = tasks.filter(t=>t.status==='todo');
    const doneTasks = tasks.filter(t=>t.status==='done');

    if(todoTasks.length===0){
      const d=document.createElement('div'); d.className='empty'; d.textContent='Tidak ada tugas. Tambah tugas baru.'; todoListEl.appendChild(d);
    } else todoTasks.forEach(t=> todoListEl.appendChild(createTaskElement(t)));

    if(doneTasks.length===0){
      const d=document.createElement('div'); d.className='empty'; d.textContent='Belum ada yang selesai.'; doneListEl.appendChild(d);
    } else doneTasks.forEach(t=> doneListEl.appendChild(createTaskElement(t)));

    countTodo.textContent = todoTasks.length;
    countDone.textContent = doneTasks.length;
  }

  function addTaskFromInput(){
    const text = input.value.trim();
    if(!text) return;
    tasks.unshift({ id: uid(), text, status:'todo' });
    save();
    input.value='';
    render();
    input.focus();
  }

  addBtn.addEventListener('click', addTaskFromInput);
  input.addEventListener('keydown', e => { if(e.key==='Enter') addTaskFromInput() });

  function setupDrop(listEl, status){
    listEl.addEventListener('dragover', e => { e.preventDefault(); listEl.classList.add('dragover') });
    listEl.addEventListener('dragleave', ()=> listEl.classList.remove('dragover'));
    listEl.addEventListener('drop', e => {
      e.preventDefault(); listEl.classList.remove('dragover');
      const id = e.dataTransfer.getData('text/plain');
      const t = tasks.find(x => x.id === id);
      if(t){ t.status = status; save(); render(); }
    });
  }

  setupDrop(todoListEl, 'todo');
  setupDrop(doneListEl, 'done');

  // init
  load();
  render();
})();