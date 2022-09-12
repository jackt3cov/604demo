import React, {Component, Fragment} from 'react';


export default class Task extends Component {
    state = {
    isEditMode: false,
        updateTaskTitle: this.props.taskTitle,
        updateTaskContent: this.props.taskContent
    }

    handleTaskEdit = event => {
        event.preventDefault();
        this.setState({isEditMode: true})
    }

    handleTaskSave = event => {
        event.preventDefault();
        this.props.handleUpdateTask(this.props.id, this.state.updateTaskTitle, this.state.updateTaskContent);
    }

    onAddTaskTitleChange = event =>{
        this.setState({"updateTaskTitle": event.target.value});
    }

    onAddTaskContentChange = event =>{
        this.setState({"updateTaskContent": event.target.value});
    }

    render() {

        const taskCard = {
            height: '',
            width: '',
        };


        return(
           // <div className = "column is-4 is-centred">
            <div className="title is-child box notification ">
                <div className="columns is-half">
                {
                    this.props.isAdmin &&
                    <Fragment>
                        <a href="/" onClick= {this.handleTaskEdit} className="product-edit-icon">


                        </a>
                        <button onClick= {event => this.props.handleDeleteTask(this.props.id, event)} className="delete"></button>
                    </Fragment>
                }
                </div>

                
                    <div>
                        <p>Edit Task Title</p>
                        <input className="input is-medium" 
                        type="text" 
                        placeholder="Enter Task Title" 
                        value ={this.state.updatetasktitle} 
                        onChange={this.onAddTaskTitleChange}/>

                        <p className="task-id">
                            id : {this.props.id}
                        </p>
                        <button type="submit" className = "button is-info is-small" onClick={this.handleTaskSave}>
                            Save task
                        </button>

                    </div>

                    
                    <div>
                       <p className="task-title">{this.props.taskTitle}</p>
                       <p className="task-content">{this.props.taskContent}</p>
                    </div>
                

                </div>
               // </div>
            )
    }

}
