import './MainPage.css';
import logo from './logo.svg';
import React from 'react';
function MainPage(props){
    return(
        <div>
            <img src={logo} className="App-logo" alt="logo" />
            <br/>
            <br/>
            <div className="btnNewList" onClick={props.newListClick}>NEW LIST</div>

            <br/>
            <br/>
            <br/>
            <br/>

            <div className="codeInput">
            <input type="text" placeholder="Enter code" maxLength="8" spellCheck="false" ref={props.inputRef}></input>
            </div>

            <div className="btnOpenExisting" onClick={props.openExistingClick}>OPEN LIST</div>
        </div>
    );
}
export default MainPage;