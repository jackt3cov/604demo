import React, {Component, Fragment} from 'react';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// test comment pls work
export default class Class extends Component {
    state = {
    isEditMode: false,
        updatetasktitle: this.props.title,
        updatetaskconent: this.props.content,
        chosenClass: this.props.chosenClass
    }

        handleTaskEdit = event => {
            event.preventDefault();
            this.setState({isEditMode: true})
        }

    handleTaskSave = event => {
            event.preventDefault();
            this.setState({isEditMode: false})
            this.props.handleUpdateTask(this.props.id, this.state.updateTaskTitle);
        }

    onAddTaskTitleChange = event =>{
            this.setState({"updatetasktitle": event.target.value});
        }

    onAddTaskContentChange = event =>{
            this.setState({"updatetaskcontent": event.target.value});
        }

    render() {

            const taskCard = {
                height: '',
                width: '',
            };


            return(
                <div className = "title is-child box notification is-sucess">
                {
                    this.props.isAdmin &&
                    <Fragment>
                        <a href="/" onClick= {this.handleTaskEdit} className="product-edit-icon">

                        </a>
                        <button onClick= {event => this.props.handleDeleteTask(this.props.id, event)} className="delete"></button>
                    </Fragment>
                }

                {
                    this.state.isEditMode ? 
                    <div>
                        <p>Edit Class Title</p>
                        <input className="input is-medium" 
                        type="text" 
                        placeholder="Enter Task Title" 
                        value ={this.state.updatetasktitle} 
                        onChange={this.onAddTaskTitleChange}/>

                        <p className="task-id">
                            id : {this.props.classCode}
                        </p>
                        <button type="submit" className = "button is-info is-small" onClick={this.handleTaskSave}>
                            Save task
                        </button>

                    </div>

                    :
                    <div>
                         <a href="/tasks" className="class-id">Class : {this.props.id}</a>

                    </div>
                }

                </div>
            )
    }

}