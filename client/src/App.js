import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './containers/Landing/Landing'
import Home from './containers/Home'
import Search from './containers/Search'
import About from './components/About'
import NavBar from './components/Navbar';
import VideogameInfo from './containers/VideogameInfo'
import Form from  './components/Form'


export default function App() {
  return (
    <div className='App'>
      <Route path='/' exact component={Landing} />
      <Route path='/home' component={Home} />
      <Route path='/home' component={NavBar} />
      <Route path='/about' exact component={About} />
      <Route path="/about" component={NavBar} />
      <Route path="/add" component={NavBar} />
      <Route path="/videogames" component={NavBar} />
      <Route path='/add' exact component={Form} />
      <Route exact path='/videogame/:id' render={({ match }) => < VideogameInfo id={match.params.id} />}/>
      <Route exact path='/videogames/:name' render={({ match }) => < Search props={match.params} />} />
    </div>
  );
}
