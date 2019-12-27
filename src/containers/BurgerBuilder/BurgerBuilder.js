import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad : 1,
            bacon : 1,
            cheese : 2,
            meat : 2
        }
    }

    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updateIngredients = {...this.state.ingredients}; // try this without spread op

        updateIngredients[type] = updatedCount;

        this.setState({
            ingredients : updateIngredients;
        });


    }

    render() {

        return(
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls/>
            </Aux>
        );
    }

}

export default BurgerBuilder;