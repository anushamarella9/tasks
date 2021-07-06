import React, { useState }from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { showProductPage } from "../features/ProductVisibility";
import { showDivisionVisibility } from "../features/DivisionVisibility";
import Product from './Product';
import TasksPage from './TasksPage';

export default function Sum(props){
    const product = useSelector((state) => state.product.value)
    const division = useSelector((state) => state.division.value)
    const dispatch = useDispatch()

    const[state, setState] = useState({
        value1 : 0,
        value2 : 0,
        sumoftwo:0
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Name: " + name + " : " + value);
        setState((prevProps) => ({
          ...prevProps,
          [name]: value
        }));
      };
   
    const handleSubmit = () => {
        setState((prevProps) => ({
            ...prevProps,
            sumoftwo : parseInt(state.value1) + parseInt(state.value2)
          }));
        }

    let _productcomponent = <div></div>;
    let _divisioncomponent = <div></div>;
    if(product){
        _productcomponent = <Product />;
    }
    if(division){
        _divisioncomponent = <TasksPage />
    }

    return(
        <div>
            <div>sum of two numbers</div>
            <input type="text"
            name="value1"
            onChange={handleChange}>
            </input>

            <input 
            type="text"
            name="value2"
            onChange={handleChange}>
            </input>

            <button onClick={handleSubmit}>
                sum
            </button>

            <br></br>
            <button onClick={() =>
                dispatch(showProductPage())
            }>
                Product in sum component
            </button>

            <div><button onClick={() =>
                dispatch(showDivisionVisibility())
            }>
                division in sum component
            </button>
            </div>

            <div>{state.sumoftwo}</div>

            {_productcomponent}
            {_divisioncomponent}
        </div>
    )
}