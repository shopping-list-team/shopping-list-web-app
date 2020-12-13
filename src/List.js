import './List.css';
import Bin from './bin.png'
function List({items, listName, accessCode, onBinClick, onNameClick, onAddClick, itemName, onDeleteList, onListNameChange, listNameChanged}){

    return(
        <div className="listDiv">
            <div className="nameDiv">
                <input type="text" placeholder={listName} maxLength="15" spellCheck="false" ref={listNameChanged} onBlur={() => onListNameChange()} onKeyPress={(e) => {if(e.key==="Enter")onListNameChange()}}></input>
                <span className="deleteListX" onClick={() => onDeleteList()}>X</span>
            </div>
            <div className="codeDiv">
                {accessCode}
            </div>
            <br/>
            <div className="addDiv">
                <input type="text" placeholder="item to add..." maxLength="15" spellCheck="false" ref={itemName} onKeyPress={(e) => {if(e.key==="Enter")onAddClick(itemName)}}></input>
                <span className="addItem+" onClick={() => onAddClick(itemName)}>+</span>
            </div>
            {items.map(item => (
                <div className="itemDiv"key={item.id}>
                    <span className={item.is_bought===true?"line-through":""} onClick = {() => onNameClick(item.id)}>{item.name}</span>
                    <img src={Bin} width="30" alt="Delete item" onClick={() => onBinClick(item.id)}></img>
                </div>
            ))}
        </div>
    );
}

export default List;
