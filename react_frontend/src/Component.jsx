import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";
import './Component.css';
import { useForm } from './GlobalState';
import './fontawesome-free-6.4.2-web/css/all.css';

const SideNavigation = () => {
    const {
        toHome,
        notHome,
        toCompleted,
        notCompleted,
        toIncomplete,
        notIncomplete,
        toImportant,
        notImportant,} = useForm();
    const [aciveNav, SetActiveNavigation] = useState('home');
    const handleNavOnClick = (navItem) => {
        SetActiveNavigation(navItem)
    }
    return(
        <div className="sidebar justify-content-center">
           <div id='div1' className="centerdiv p-0">
            <nav>
                <ul>
                    <li 
                    className={`mb-2 ${aciveNav === 'home' ? 'active' : ''}`}
                    onClick={() => {
                        toHome();
                        notCompleted();
                        notImportant();
                        notIncomplete();
                        handleNavOnClick('home')
                    }}
                    >
                         <i className='fa fa-home me-2'></i>
                    </li>
                    
                    <li 
                    className={` mb-2 ${aciveNav === 'important' ? 'active' : ''}`}
                    onClick={() => {
                        notHome();
                        notCompleted();
                        toImportant();
                        notIncomplete();
                        handleNavOnClick('important')
                    }}
                    >
                        <i className='fa fa-check-to-slot me-2'></i>
                    </li>
                    
                    <li 
                    className={`text-white mb-2 ${aciveNav === 'complete' ? 'active' : ''}`}
                    onClick={() => {
                        notHome();
                        toCompleted();
                        notImportant();
                        notIncomplete();
                        handleNavOnClick('complete')
                    }}
                    >
                         <i className='fa fa-check me-2'></i>
                    </li>
                    
                    <li 
                    className={`text-white ${aciveNav === 'donow' ? 'active' : ''}`}
                    onClick={() => {
                        notHome();
                        notCompleted();
                        notImportant();
                        toIncomplete();
                        handleNavOnClick('donow')
                    }}
                    >
                         <i className='fa fa-list-check me-2'></i>
                    </li>
                </ul>
            </nav>
        </div>
        </div>
    );
};

const Overlay =() => {
    return(
        <div id='overlay'>
        </div>
    );
}

const MainBody= () => {
    const {home, incomplete, important, completed, openForm, showForm, closeForm, openSuccess} = useForm();
    const [check, setCheck] = useState(false);
    const [completedList, setCompletedList] = useState([])
    const [incompleteList, setIncompleteList] = useState([])
    const [importantList, setImportantList] = useState([])
    const [taskList, setTasklist] = useState([])
    useEffect(()=>{
        getCompletedTask()
        getIncompletedTask()
        getImportantTask()
        fetchTask()
    },[])
    const fetchTask = async ()=>{
        const response =  await axios.get('http://localhost:8080/task/all')
        setTasklist(response.data)
    }
    const getCompletedTask = async () =>{
        const response = await axios.get('http://localhost:8080/task/completed')
        setCompletedList(response.data)
    }
    const getIncompletedTask = async () =>{
        const response = await axios.get('http://localhost:8080/task/incomplete')
        setIncompleteList(response.data)
    }
    const changeCompletedState=async id =>{
        await axios.put(`http://localhost:8080/task/changeState/${id}`)
        fetchTask()
        getCompletedTask()
        getIncompletedTask()
        getImportantTask()
    }
    const getImportantTask = async ()=>{
        const response = await axios.get('http://localhost:8080/task/important')
        setImportantList(response.data)
    }
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        time: '',
        important: false,
    })
    const handleCheck = (event) => {
        setCheck(event.target.checked);
        setFormData({
          ...formData,
          important: event.target.checked,
        });
      };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value            
        });
    };
    const sendData = async (e)  =>  {
        e.preventDefault();
        await axios.post(`http://localhost:8080/task/add`, formData)
        .then(data => {
            if(data.status===200){
                fetchTask()
                getCompletedTask()
                getIncompletedTask()
                getImportantTask()
                openSuccess();
            }
        })
        .catch(error => console.error('Error: ', error));
    }
    return(
        <div className="mainbody">
            <div>
                <h3 id='pin' className='text-white mb-4' style={{position:'absolute' ,margin:30}}>
                   {home ? ('Home') : ('')}
                   {incomplete ? ('Incomplete') : ('')}
                   {important ? ('Important') : ('')}
                   {completed ? ('Completed') : ('')}
                    </h3>
            </div>
            <div className="" id='taskcontain' style={{padding:'12px'}}>
                
                {/* loading the task from the back end */}
                
                {home &&
                    taskList.map((task)=>(
                        <div className='card' key={task.taskId} >
                            <div className='card-body text-white' id='occupied'>
                                <h4 className='card-title mt-2'>{task.name}</h4>
                                <p id='carp' className='card-title' style={{Height:'90px', maxHeight:'90px', fontSize:'15px'}}>
                                    {task.description}
                                </p>
                                <div id='bt' className='d-flex justify-content-between '>
                                    <div className='mt-2'>
                                        <label>{task.time}</label>
                                        <p id='con' className={task.completed ? 'bg-success' : 'bg-danger'} onClick={(()=>{changeCompletedState(task.taskId)})}>{task.completed ? 'Completed' : 'Incompleted'} </p>
                                    </div >
                                    <i className='fa fa-trash ms-3 mt-4' onClick={(async()=>{
                                        try{
                                            await axios.delete(`http://localhost:8080/task/delete/${task.taskId}`)
                                            fetchTask()
                                        }catch(err){
                                            console.log('Error while deleting task ',err)
                                        }
                                    })}></i>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {important &&
                    importantList.map((task)=>(
                        <div className='card' key={task.taskId} >
                            <div className='card-body text-white' id='occupied'>
                                <h4 className='card-title mt-2'>{task.name}</h4>
                                <p id='carp' className='card-title' style={{Height:'90px', maxHeight:'90px', fontSize:'15px'}}>
                                    {task.description}
                                </p>
                                <div id='bt' className='d-flex justify-content-between '>
                                    <div className='mt-2'>
                                        <label>{task.time}</label>
                                        <p id='con' className={task.completed ? 'bg-success' : 'bg-danger'} onClick={(()=>{changeCompletedState(task.taskId)})}>{task.completed ? 'Completed' : 'Incompleted'} </p>
                                    </div >
                                    <i className='fa fa-trash ms-3 mt-4' onClick={(async()=>{
                                        try{
                                            await axios.delete(`http://localhost:8080/task/delete/${task.taskId}`)
                                            fetchTask()
                                        }catch(err){
                                            console.log('Error while deleting task ',err)
                                        }
                                    })}></i>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {completed &&
                    completedList.map((task)=>(
                        <div className='card' key={task.taskId} >
                            <div className='card-body text-white' id='occupied'>
                                <h4 className='card-title mt-2'>{task.name}</h4>
                                <p id='carp' className='card-title' style={{Height:'90px', maxHeight:'90px', fontSize:'15px'}}>
                                    {task.description}
                                </p>
                                <div id='bt' className='d-flex justify-content-between '>
                                    <div className='mt-2'>
                                        <label>{task.time}</label>
                                        <p id='con' className='bg-success'>{task.completed ? 'Completed' : 'Incompleted'} </p>
                                    </div >
                                    <i className='fa fa-trash ms-3 mt-4' onClick={(async()=>{
                                        try{
                                            await axios.delete(`http://localhost:8080/task/delete/${task.taskId}`)
                                            fetchTask()
                                        }catch(err){
                                            console.log('Error while deleting task ',err)
                                        }
                                    })}></i>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {incomplete &&
                    incompleteList.map((task)=>(
                        <div className='card' key={task.taskId} >
                            <div className='card-body text-white' id='occupied'>
                                <h4 className='card-title mt-2'>{task.name}</h4>
                                <p id='carp' className='card-title' style={{Height:'90px', maxHeight:'90px', fontSize:'15px'}}>
                                    {task.description}
                                </p>
                                <div id='bt' className='d-flex justify-content-between '>
                                    <div className='mt-2'>
                                        <label>{task.time}</label>
                                        <p id='con' className={task.completed ? 'bg-success' : 'bg-danger'} onClick={(()=>{changeCompletedState(task.taskId)})}>{task.completed ? 'Completed' : 'Incompleted'} </p>
                                    </div >
                                    <i className='fa fa-trash ms-3 mt-4' onClick={(async()=>{
                                        try{
                                            await axios.delete(`http://localhost:8080/task/delete/${task.taskId}`)
                                            fetchTask()
                                        }catch(err){
                                            console.log('Error while deleting task ',err)
                                        }
                                    })}></i>
                                </div>
                            </div>
                        </div>
                    ))
                }
                
                {
                    home &&
                    <div id='emptydiv' className='card' onClick={openForm}>
                        <div id='divv' className='card-body text-white d-flex' onClick={openForm}>
                            <h4 className='card-title'>New Task</h4>
                            <i className='fa fa-plus mt-1 ms-3'></i>
                        </div>
                    </div>
                }
                
                
            </div>
            {showForm && 
            <form className='form form-check' id='formbox'>
            <div id='toptop'>
                <h3 className='form-title text-black'>New Task</h3>
                <i className='fa fa-x' onClick={() => {
                    closeForm();
                }}></i>
            </div>
            
            <label  htmlFor='name'>Title</label>
            <input 
            required
            type='text'  
            id='name' 
            name='name' 
            className='form-control' 
            placeholder='Hello Nky '  
            value={formData.name} 
            onChange={handleChange}
            />

            <label htmlFor='description' >Description</label>
            <textarea 
            id='description' 
            name='description' 
            className='form-control mb-2' 
            type='text'  
            placeholder='Hello Nky Here...'   
            required 
            value={formData.description}
            onChange={handleChange}
            />

            <label htmlFor='date' >Date</label>
            <input 
            id='date' 
            name='time' 
            className='form-control mb-0' 
            type='date' 
            required 
            value={formData.date} 
            onChange={handleChange}
            />

            <div id='impdiv'>
                <div>
                    <label htmlFor='check' text='important' id='imp' className='text-black' >Important</label>
                    <input className='ms-2 mt-1' 
                    id='check' 
                    type='checkbox' 
                    checked={check}
                    onChange={handleCheck}/>
                </div>
                <div>
                    <button id='creat' onClick={sendData} className='' type='submit'><i className='fa fa-plus'></i> Create task</button>
                </div>
            
            </div>
        </form>
            }
        </div>
    );
};

const Allcontain =() => {
    const {showOverlay, success, showForm} = useForm();
    return(
        <div className='maincontainer'>
        {showOverlay && <Overlay/>}
        <SideNavigation/>
        <MainBody/>
        {success && <SuccessCard/>}
        </div>
    );
}

const SuccessCard = () => {
    return(
        <div id='succes'>
            <div className='mt-3'>
            <label>Success</label>
            <i className='fa fa-thumbs-up'></i>
            </div>
        </div>
    );
}

export { Allcontain };
