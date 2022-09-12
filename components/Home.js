import React, { Fragment, Link } from 'react';
import HomeContent from './HomeContent.js';
import HomeHero from './HomeHero';

export default function Home() {
  return (
    // <main style={{ padding: "1rem 0" }}>
    //   <h2>Home</h2>
    //     <p>Test homepage for routes</p>
    // </main>

<Fragment>
<div className="box cta">  
    <h1 className="has-text-centered">TamBan</h1>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to='/home'> Home </Link> |{" "}
        <Link to='/classes'> Classes</Link> |{" "}
        <Link to='/tasks'> Tasks</Link> |{" "}
      </nav>
</div>

        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
              <span>Classes</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>

          <div class="dropdown-menu" id="dropdown-menu4" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <p>601AZ</p>
              </div>
              <div class="dropdown-item">
                <p>602AZ</p>
              </div>
              <div class="dropdown-item">
                <p>603AZ</p>
              </div>
            </div>
          </div>

        </div>
      


  </Fragment>
  );

}