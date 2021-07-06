import React from 'react';

class Product extends React.Component{
    constructor(props){
        super()
        this.state={
            value1 : 0,
            value2 : 0,
            productof2:0
        }
        this.handleChange = this.handleChange.bind(this);
        this.multiply = this.multiply.bind(this);
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    multiply(){
        this.setState({productof2 : this.state.value1 * this.state.value2})
    }

    render(){
        return(
            <div>
                <div>product of two numbers</div>
            <input name="value1" type="text"
            onChange={this.handleChange}
            />

            <input name="value2" type="text"
            onChange={this.handleChange}
            />
            
            <button onClick={this.multiply}>
                product
            </button>
            <div>{this.state.productof2}</div>
            </div>
        )

    }
}
export default Product;