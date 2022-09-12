import React, {Component, Fragment} from 'react';
import Task from './task';
import Classes from "./Classes.js";
import Home from "./Home.js";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import axios from "axios";

const config = require('../config.json');

export default class Tasks extends Component{

    state = {
    newtask: null,
        tasks: [],
        output: [],
        outputDOtemp: [],
        outputDO: [],
        outputDOINGtemp: [],
        outputDOING: [],
        taskProg: []
    }

    fetchTasks = async () => {
        try {
            const currentClass = "CLA#602AZ";
            const DOx = "DO";
            const DOINGx = "DOING";
            const DONEx = "DONE";

            const res = await axios.get(`${config.api.invokeUrl}/classtask`);
            const tasks = res.data;
            //var taskProg = Object.values(tasks.taskProgress);

            var tasksArray = JSON.stringify(tasks);
            console.log(Object.values(tasks));
            
            const output = Object.values(tasks).filter(value => {
                return value.classCode == currentClass && value.id.includes("CTA");}
                );
            console.log(Object.values(output));
            this.setState({output: output});

            // const output = Object.values(tasks).filter(value => {
            //     return value.classCode == currentClass;}
            //     );




            const outputDOtemp = Object.values(tasks).filter(value => {
                return value.classCode == currentClass && value.id == "STU#001";}
                );
            console.log(outputDOtemp);
            var doArr = JSON.stringify(outputDOtemp);
            console.log(doArr);
            this.setState({outputDOtemp: outputDOtemp});

            const outputDO = Object.values(outputDOtemp).filter(value => {
                return value.classCode == currentClass && value.DO.includes("CTA");}
                );
            console.log(Object.values(outputDO));
            this.setState({outputDO: outputDO});



            const outputDOINGtemp = Object.values(tasks).filter(value => {
                return value.classCode == currentClass && value.DOING.includes("CTA");}
                );
            console.log(outputDOINGtemp);
            var doingArr = JSON.stringify(outputDOINGtemp);
            console.log(doingArr);
            this.setState({outputDOINGtemp: outputDOINGtemp});



            const outputDOING = Object.values(outputDOINGtemp).filter(value => {
                return value.classCode == currentClass && value.DOING.includes("CTA");}
                );
            console.log(Object.values(outputDOING));
            this.setState({outputDOING: outputDOING});








//&& value.taskProgress.includes("DO")

            // const outputDOING = Object.values(tasks).filter(value => {
            //     return value.classCode == currentClass && value.id.includes("STU") && value.taskProgress == DOING;}
            //     ); 

            const outputDONE = Object.values(tasks).filter(value => {
                return value.classCode == currentClass && value.id.includes("STU") && value.taskProgress == DONEx;}
                ); 
                
            //console.log(taskProg);
            
            
            console.log(outputDONE);
        
            
            this.setState({tasks: tasks});
            



        } catch(err){
            console.log(`An error has occured: ${err}`);
        }
    }




    componentDidMount = () => {
        this.fetchTasks();
    }

    render() {
    return (
        <Fragment>
            <div className="box cta">  
                <h1 className="has-text-centered">TamBan</h1>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to='/home'> Home </Link> |{" "}
                    <Link to='/classes'> Classes</Link> |{" "}
                    <Link to='/tasks'> Tasks</Link> |{" "}
                </nav>
            </div>
        <section className="section">
            <div className="container">
                <p className="subtitle is-5">My Tasks</p>
                    <br/>
                
                <div className="columns">
                    <div className="column">
                        <div className="title is-ancestor">
                            
                                {
                                    this.state.output && this.state.output.length  > 0 
                                    ? this.state.output.map(output =>
                                    <Task taskTitle={output.taskTitle} taskContent={output.taskContent} id={output.id} key={output.id} />)
                                    : <div className="title notification is-warning">No tasks found</div>
                                }
                         
                        </div>
                    </div>

                    <div className="column">
                        <div className="title is-ancestor">
                            
                                {
                                    this.state.output && this.state.output.length > 0
                                    ? this.state.output.map(output =>
                                    <Task taskTitle={output.taskTitle} taskContent={output.taskContent} id={output.id} key={output.id} />)
                                    : <div className="title notification is-warning">No tasks found</div>
                                }
                         
                        </div>
                    </div>

                    <div className="column">
                        <div className="title is-ancestor">
                            
                                {
                                    this.state.output && this.state.output.length > 0
                                    ? this.state.output.map(output =>
                                    <Task taskTitle={output.taskTitle} taskContent={output.taskContent} id={output.id} key={output.id} />)
                                    : <div className="title notification is-warning">No tasks found</div>
                                }
                             
                        </div>
                    </div>
                </div>




            </div>
        </section>
        </Fragment>
        )
    }
    }