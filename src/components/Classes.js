import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import React, {Component, Fragment} from 'react';
import Tasks from './Tasks.js';
import Home from './Home.js';
import Class from './class.js';
import axios from "axios";

const config = require('../config.json');

export default class Classes extends Component{

    state = {
    newclass: null,
        classes: [],
        codes: [],
        codesArray: [],
        output: []
    }
   

    fetchClasses = async () => {
        try {
            const userID = "STU#001";

            const res = await axios.get(`${config.api.invokeUrl}/classtask`);
            const classes = res.data;


            var codesArray = JSON.stringify(classes);
            console.log(Object.values(classes));

           // console.log(codesArray);

            const output = Object.values(classes).filter(value => {
                return value.id ==  userID;}
                ); 

           // var codes = codesArray.filter(id => codesArray.id.includes(userID));

            this.setState({output: output});
            this.setState({classes: classes});
            console.log(classes);
            console.log("Output: ", output);
        } catch(err){
            console.log(`An error has occured: ${err}`);
        }
    }

    componentDidMount = () => {
        this.fetchClasses();
    }

    render() {
    return (
<Fragment>
<div className="box cta">  
    <h1 className="has-text-centered">TamBan LTD</h1>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to='/home'> Home </Link> |{" "}
        <Link to='/classes'> Classes</Link> |{" "}
        <Link to='/tasks'> Tasks</Link> |{" "}
      </nav>
</div>
                <section className="section">
                    <div className="container">
                        
                        
                        <p className="subtitle is-5">My Classes</p>
                        <br/>
                        <div className="columns">
                            <div className="column">
                                <div className="title is-ancestor">
                                    <div className="title is-4 is-parent is-vertical">
                                        {
                                            this.state.output && this.state.output.length > 0
                                            ? this.state.output.map(output =>
                                                <Class id = {output.classCode} />)
                                                : <div className="title notification is-warning">No classes found</div>
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