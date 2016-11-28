import React from 'react';
import AddFishForm from './AddFishForm';
class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.renderInventory = this.renderInventory.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e,key) {
        const fish = this.props.fishes[key]
        
        //take a copy of the fish and update it with the new data 
        // const updatedFish = Object.assign({}, fish)
        const updatedFish = {
            ...fish,
             [e.target.name]: e.target.value // computed property ES6
         }
         this.props.updateFish(key, updatedFish)
    }
    renderInventory(key) {
        const fish = this.props.fishes[key]
        return (
                <div className="fish-edit" key={key}>
                    <input value={fish.name} name="name"  onChange={(e) => this.handleChange(e,key)} type="text" placeholder="Fish name"/>
                    <input value={fish.price} name="price"  onChange={(e) => this.handleChange(e,key)} type="text" placeholder="Fish price"/>
                    <select value={fish.status} onChange={(e) => this.handleChange(e,key)} name="status">
                        <option value="available">Fresh</option>
                        <option value="unavailable">Sold Out</option>
                    </select>
                    <textarea value={fish.desc} onChange={(e) => this.handleChange(e,key)} name="desc"  placeholder="Fish desc "/>
                    <input value={fish.image} onChange={(e) => this.handleChange(e,key)} name="image"  type="text" placeholder="Fish image"/>
                    <button onClick={(e) => this.props.removeFish(key)}>Remove Fish</button>
                </div>
            )
    }
    render(){
        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>            
        )
    }
}

export default Inventory;