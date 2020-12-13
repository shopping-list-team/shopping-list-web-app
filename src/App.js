import './App.css';
import MainPage from './MainPage.js'
import List from "./List.js"

import React from 'react';

const addr = 'http://30485e7a6e6b.eu.ngrok.io';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {currentPage: "MainPage", items: [], accessCode: null, listName: null};
  }

  componentDidMount(){
    
  }

  async refreshLocalList()
  {
    var itemsToSort = (await fetch(addr+'/items/?access_code='+this.state.accessCode).then((response) => response.json()));
    console.log(itemsToSort)
    let itemsSorted = [];
    for (var i in itemsToSort)
    {
      if(itemsToSort[i].is_bought===false)
        itemsSorted.push(itemsToSort[i]);
    }
    for (i in itemsToSort)
    {
      if(itemsToSort[i].is_bought===true)
        itemsSorted.push(itemsToSort[i]);
    }
    
    this.setState({items: itemsSorted});
  }

  async createNewList(event)
  {
    const options = { 
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
         body: JSON.stringify({
           "name": "Shopping list"
          })
      } 
    var apiResponse = await fetch(addr+'/shopping-lists/', options).then((response) => response.json())
    this.setState({currentPage: "ListEdit", accessCode: apiResponse.access_code, listName: apiResponse.name});
    this.refreshLocalList();
  }

  async openExistingList(event)
  {
    
    var itemsToSort = (await fetch(addr+'/items/?access_code='+this.textInput.value).then((response) => response.json()));
    console.log(itemsToSort)
    let itemsSorted = [];
    for (var i in itemsToSort)
    {
      if(itemsToSort[i].is_bought===false)
        itemsSorted.push(itemsToSort[i]);
    }
    for (i in itemsToSort)
    {
      if(itemsToSort[i].is_bought===true)
        itemsSorted.push(itemsToSort[i]);
    }

    var listData = (await fetch(addr+'/shopping-lists/'+this.textInput.value).then((response) => response.json()));

    this.setState({currentPage: "ListEdit", items: itemsSorted, accessCode: this.textInput.value, listName: listData.name});
  }

  async deleteItem(id)
  {
    const options = { 
      method: 'delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      }
    } 

    await fetch(addr+'/all-items/'+id+"/", options);
    this.refreshLocalList();
  }

  async markAsBought(id)
  {
    var temp;
    for (var item in this.state.items)
      if(this.state.items[item].id===id)
        temp = this.state.items[item].is_bought;

    const options = { 
      method: 'patch',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
         body: JSON.stringify({
           "is_bought": !temp
          })
      } 
      await fetch(addr+'/all-items/'+id+'/', options)
      this.refreshLocalList();

  }

  async addItem(event)
{
  const options = { 
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
       body: JSON.stringify({
         "name": this.itemName.value, 
         "content": this.itemName.value, 
         "shopping_list": this.state.accessCode, 
         "is_bought": "false"
        })
    } 

  await fetch(addr+'/all-items/', options)
  this.refreshLocalList();
  this.itemName.value = null;
  }

  async deleteList(event)
  {
    const options = { 
      method: 'delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      }
    } 

    await fetch(addr+'/shopping-lists/'+this.state.accessCode+"/", options)
    this.setState({currentPage: "MainPage", items: [], accessCode: null, listName: null})
  }

async changeListName(){
  console.log(this.changedName.value)
  const options = { 
    method: 'patch',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
       body: JSON.stringify({
         "name": this.changedName.value
        })
    }

    var listResponse = await fetch(addr+"/shopping-lists/"+this.state.accessCode+"/", options).then((response) => response.json())
    this.setState({listName: listResponse.name})

}

  render (){
    return(
        <div className="App">
          {this.state.currentPage==="MainPage" && <MainPage newListClick={this.createNewList.bind(this)} 
                                                            openExistingClick={this.openExistingList.bind(this)} 
                                                            inputRef={(input) => this.textInput = input} />}
          {this.state.currentPage==="ListEdit" && <List  items={this.state.items} 
                                                          listName={this.state.listName} 
                                                          accessCode={this.state.accessCode}
                                                          onBinClick={this.deleteItem.bind(this)} 
                                                          onNameClick={this.markAsBought.bind(this)} 
                                                          itemName={(inputName) => this.itemName = inputName} 
                                                          onAddClick={this.addItem.bind(this)} 
                                                          onDeleteList={this.deleteList.bind(this)}
                                                          onListNameChange={this.changeListName.bind(this)}
                                                          listNameChanged={(listName) => this.changedName = listName}/>}
        </div>
    )
  };
}

export default App;
