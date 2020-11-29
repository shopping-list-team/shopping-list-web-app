import './MainPage.css';
import logo from './logo.svg';

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
            <input type="text" placeholder="Enter code" maxLength="8" spellCheck="false"></input>
            </div>

            <div className="btnOpenExisting"> 
            OPEN LIST
            </div>
        </div>
    );
}
export default MainPage;