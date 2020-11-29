import './App.css';
import MainPage from './MainPage.js'
import List from "./List.js"

import React from 'react';

const page = "mainpage";



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {currentPage: "MainPage"};
  }

  crateNewList(event)
  {
    this.setState({currentPage: "ListEdit"});
  }

  render (){
    return(
    <div className="App">
      <body>
      {this.state.currentPage==="MainPage" && <MainPage newListClick={this.crateNewList.bind(this)}/>}
      {this.state.currentPage==="ListEdit" &&
        <div>
          <input type="text"></input>
        </div>
      }
      </body>
    </div>
    )
  };
}

export default App;
