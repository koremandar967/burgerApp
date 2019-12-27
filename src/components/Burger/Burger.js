import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log(props);
    let transformedIngredients = Object.keys(props.ingredients)
                                    .map(igKey => {
                                            const arr = [...Array(props.ingredients[igKey])];
                                            console.log(arr);
                                            // ingrd amt i.e 2 = [ , ]
                                            return [...Array(props.ingredients[igKey])]   
                                            .map( (_,i) => {
                                                //coz every list should have unique "key" prop
                                             return  <BurgerIngredient key ={igKey + i} type = {igKey} />
                                             
                                            });

                                    }) 
                                    .reduce((arr,el) => {
                                        console.log("arr "+arr);
                                        return arr.concat(el)
                                    },[]);   // [] - intial value, arr - transformedIngrdients,
                                            // el - iterated element of

                        console.log(transformedIngredients);

                        if(transformedIngredients.length === 0) {
                            transformedIngredients = <p>Please start adding ingredients!</p>
                        }

    return(
        <div className = {classes.Burger}>
            <BurgerIngredient type ="bread-top"/>
                {transformedIngredients}
            <BurgerIngredient type ="bread-bottom"/>
        </div>
    );
}

export default burger;