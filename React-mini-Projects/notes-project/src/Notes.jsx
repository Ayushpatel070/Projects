import { useState } from 'react'
import "./notes.css"

const Notes = () => {

  let [formdata, setFormdata] = useState({
    heading: "",
    detail: ""
  });
  let [task, setTask] = useState([]);

  let handlechange = (e) => {
    setFormdata((currdata) => {
      return { ...currdata, [e.target.name]: e.target.value };
    })
  }

  let handlesubmit = (e) => {
    e.preventDefault();
    const copyTask = [...task];
    copyTask.push({formdata});
    setTask(copyTask);
    setFormdata({
      heading: "",
      detail: ""
    });
  }

  let handledelete = (idx) => {
    const copyTask = [...task];
    copyTask.splice(idx,1);
    setTask(copyTask);
  }
  return (
    <div className='h-screen bg-black text-white'>
      <div className='lg:flex gap-4'>

        <form className='flex flex-col gap-6 items-start p-10 lg:w-1/2' onSubmit={handlesubmit}>
          <h1 className='text-4xl font-bold'>Add Notes</h1>
          <input type="text" className='px-5 py-2 border-2 outline-none rounded w-full' placeholder='Enter Notes Heading' value={formdata.heading} name='heading' onChange={handlechange} />
          <textarea className='px-5 py-2 border-2 rounded h-30 outline-none w-full' placeholder='Enter Deatils' value={formdata.detail} name='detail' onChange={handlechange} />
          <button className='bg-white text-black px-5 py-2 outline-none rounded w-full active:scale-95'>Add Note</button>
        </form>

        <div className="card lg:w-1/2 p-10 lg:border-l-2 h-screen">
          <h1 className='text-4xl font-bold'>Recent Notes</h1>
          <div className='flex flex-wrap items-start justify-start h-[90%] overflow-auto mt-5 gap-6'>
            {task.map((ele,idx) => {
              return <div key={idx} className='flex justify-between flex-col items-start h-65 w-52 bg-cover pt-11 pb-4 px-4 rounded-2xl bg-[url("https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png")] text-black p-7'>
                <div>
                <h3 className='text-xl font-bold leading-tight'>{ele.formdata.heading}</h3>
                <p className='mt-1 leading-5.5 font-medium text-gray-700'>{ele.formdata.detail}</p>
                </div>
                <button className='bg-red-600 text-white w-full rounded py-1 text-xs font-bold active:scale-95 cursor-pointer' onClick={() => {
                  handledelete(idx)
                }}>Delete</button>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notes;
