import React, { Component, Fragment} from 'react';
import Task from './task.js';
import axios from "axios";

const config = require('../config.json');

export default class TaskAdmin extends Component {

    state = {
        newtask: {
            "id": "",
            "taskTitle": "",
            "classCode": "",
            "taskContent": ""
        },
        Tasks: []
    }

    handleAddTask = async (id, classCode, event) => {
        event.preventDefault();
        try {
            const params = {
                "id": id,
                "classCode": classCode,
                "taskTitle": this.state.newtask.taskTitle,
                "taskContent": this.state.newtask.taskcontent
            };
            await axios.post(`${config.api.invokeUrl}/classtask`, params);
            this.setState({ tasks: [...this.state.tasks, this.state.newtask]});
                
        }catch(err){
            console.log(`An error has occured: ${err}`);
        }
    }

    handleUpdateTask = async (id, classCode, taskTitle, taskContent) => {
        try{
            const params = {
                "classCode": classCode,
                "id": id,
                "taskTitle": taskTitle,
                "taskContent": taskContent
            };
            await axios.patch(`${config.api.invokeUrl}/classtask`, params);
            const taskToUpdate = [...this.state.tasks].find(task => task.id === id && task.classCode === classCode);
            const updatedTasks = [...this.state.tasks].filter(task => task.id !== id);
            taskToUpdate.taskTitle = taskTitle;
            taskToUpdate.taskContent = taskContent;
            updatedTasks.push(taskToUpdate);
            this.setState({tasks: updatedTasks});
        }catch(err){
            console.log(`An error has occured: ${err}`);

        }
        
    }

    handleDeleteTask = async (id, event) => {
        try {
            await axios.delete(`${config.api.invokeUrl}/classtask`);
            const updatedTasks = [...this.state.tasks].filter(task => task.id !== id);
            this.setState({tasks: updatedTasks});
        }catch(err){
            console.log(`Unable to delete: ${err}`);
        }
    }

        fetchTasks = async () => {

            try {
                const res = await axios.get(`${config.api.invokeUrl}/classtask`);
                const tasks = res.data;
                this.setState({tasks: tasks });
            } catch(err){
                console.log(`An error has occured:${err}`);
            }
    
    
        }

        onAddTaskTitleChange = event => this.setState({ newtask: {
            ...this.state.newtask, "taskTitle": event.target.value}});
        onAddTaskContentChange = event => this.setState({ newtask: {
            ...this.state.newtask, "taskContent": event.target.value}});   
            
        componentDidMount = () => {
            this.fetchTasks();
         }  

         render (){
            return (
                <Fragment>
                <section className="section">
                  <div className="container">
                     <h1>Task Admin</h1>
                     <p className="subtitle is-5">Add and remove products using the form below:</p>
                     <br />
                     <div className="columns">
                     <div className="columns is-one-third">
                     <form onSubmit={event => this.handleAddTask(this.state.newtask.id, event)}>
                       <div className="field has-addons">
                         <div className="control">
                           <input
                             className="input is-medium"
                             type="text"
                             placeholder="Enter Title"
                             value={this.state.newtask.taskTitle}
                             onChange={this.onAddTaskTitleChange}
                           />
                         </div>
                         <div className="control">
                            <input
                              className="input is-medium"
                              type="text"
                              placeholder="Enter id"
                              value={this.state.newtask.id}
                              onChange={this.onAddTaskIdChange}
                            />
                        </div>
                        <div className="control">
                          <button type="submit" className="button is-primary is-medium">
                              Add task
                          </button>
                        </div>
                       </div>
                      </form>
                     </div>
                     <div className="column is-two-thirds">
                       <div className="tile is-ancestor">
                         <div className="tile is-4 is-parent is-vertical">
                           {
                            this.state.tasks.map((task, index) =>
                              <task
                                isAdmin={true}
                                handleUpdateTask={this.handleUpdateTask}
                                handleDeleteTask={this.handleDeleteTask}
                                title={task.taskTitle}
                                id={task.id}
                                key={task.id}
                              />)
                           } 
                       </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </section>
             </Fragment>               

                        
        )


         }

    }