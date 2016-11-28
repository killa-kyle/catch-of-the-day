import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish'
import sampleFishes from '../sample-fishes.js'
import base from '../base'
class App extends React.Component {
    constructor(props) {
        super(props);

        // getInitialState 
        this.state = {
            fishes: {},
            order: {}
        }

        // bind functions to App component 
        this.addFish = this.addFish.bind(this)
        this.updateFish = this.updateFish.bind(this)
        this.removeFish = this.removeFish.bind(this)
        this.loadSamples = this.loadSamples.bind(this)
        this.addToOrder = this.addToOrder.bind(this)
        this.removeFromOrder = this.removeFromOrder.bind(this)
    }
    componentWillMount() {
        //  this runs right before <App> is rendered 
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })

        // check localStorage for any existing orders
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)
        if(localStorageRef){
            // update App component Order state 
            this.setState({
                order: JSON.parse(localStorageRef)
            })
        }
 
    }
    componentWillUnmount() {
        base.removeBinding(this.ref)
    }
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`,JSON.stringify(nextState.order))
        
    }
    addFish(fish){
        //update state 
        const fishes = {...this.state.fishes}        
        // add in our new fish 
        const timestamp = Date.now()
        fishes[`fish-${timestamp}`] = fish 
        // set state 
        this.setState({fishes: fishes})
        // this.setState({fishes}) ES6
    }
    updateFish(key, updatedFish){
        const fishes = {...this.state.fishes}
        fishes[key] = updatedFish
        this.setState({fishes})
    }
    removeFish(key){
        const fishes = {...this.state.fishes}
        fishes[key] = null
        this.setState({fishes})
    }

    loadSamples() {
     this.setState({fishes: sampleFishes})   
    }

    addToOrder(key){
        // take copy of state 
        const order = {...this.state.order}

        // add or update new number of fish ordered
        delete order[key]

        // update state 
        this.setState({order})
    }
    removeFromOrder(key) {
        // take copy of state 
        const order = {...this.state.order}

        // add or update new number of fish ordered
        order[key] = order[key] -1  || null;

        // update state 
        this.setState({order})    
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish 
                                    key={key} 
                                    index={key} 
                                    addToOrder={this.addToOrder} 
                                    details={this.state.fishes[key]}
                                    params={this.props.params}
                                    />)
                        }
                    </ul>
                </div>
                <Order 
                    removeFromOrder={this.removeFromOrder} 
                    fishes={this.state.fishes}
                    order={this.state.order} />
                <Inventory 
                    removeFish={this.removeFish}
                    updateFish={this.updateFish}
                    addFish={this.addFish}
                    fishes={this.state.fishes}
                    loadSamples={this.loadSamples} />
            </div>
        )
    }
}

export default App;