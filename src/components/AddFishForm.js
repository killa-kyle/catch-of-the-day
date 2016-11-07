import React from 'react';

class AddFishForm extends React.Component {
    render(){
        return (
            <form action="" className="fish-edit">
                <input type="text" placeholder="Fish name"/>
                <input type="text" placeholder="Fish price"/>
                <select>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea placeholder="Fish desc "/>
                <input type="text" placeholder="Fish image"/>
                <button type="submit">+ Add Item</button>
            </form>
        )
    }
}

export default AddFishForm;