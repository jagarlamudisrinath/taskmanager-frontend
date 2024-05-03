import React, { useState, useEffect } from 'react';



function TaskTable() {
    console.log(import.meta.env.VITE_API_URL)
    const API_URL =  import.meta.env.VITE_API_URL
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Fetch tasks
    useEffect(() => {
        fetch(`${API_URL}/get-tasks`)
            .then(response => response.json())
            .then(setTasks)
            .catch(console.error);
    }, []);

    // Handle input changes
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    // Add a new task
    const addTask = (event) => {
        event.preventDefault(); // Prevent form from causing a page reload
    // const API_URL = "http://localhost:8080"
        fetch(`${API_URL}/add-task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                title: title,
                description: description
            }).toString()
        }).then(() => {
            fetch(`${API_URL}/get-tasks`) // Re-fetch tasks
                .then(response => response.json())
                .then(setTasks)
                .catch(console.error);
            setTitle('');  // Clear the input after sending
            setDescription('');  // Clear the input after sending
        }).catch(console.error);
    };

    return (
        <div>
            <ul className="nav">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Active</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
            </ul>
            <form onSubmit={addTask}>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Task Title</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={title} onChange={handleTitleChange}/>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" className="form-label">Task Descrption</label>
                <input type="text" className="form-control" id="exampleInputPassword1" value={description} onChange={handleDescriptionChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <table className="table" id="task-table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskTable;
