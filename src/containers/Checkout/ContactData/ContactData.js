import React, { Component } from 'react';
import Button from '../../../components/UI/Button/button';
import classes from '../ContactData/ContactData.module.css';
import axios from '../../../axios-orders';
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false

            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZIP'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false

            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: '',
                validation: {}, //empty object for same input control obj structuring
                valid: true,
            }
        },
        loading: false,
        formIsValid: false
    }

    orderHandler = (event) => {

        event.preventDefault();   //prevents reload all components on form submission (look call of this method)
        //   this method call comes from form tag
        console.log(this.props);

        const formData = {}

        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }


        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }


        axios.post('/orders.json', order)   //orders.json
            .then(response => {
                // console.log(response);
                this.setState({ loading: false })
                this.props.history.push('/');

            }).catch(error => {
                console.log(error)
                this.setState({ loading: false })
            });

    }

    checkValidity = (value, rules) => {    // look arrow function is not used

        let isValid = true;

        if (!rules) {
            return true;    // when to handle err when validation (i.e rules) obejct is not defined 
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }


        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {

        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...this.state.orderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        console.log(updatedFormElement.valid);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid;
        }
        console.log(formIsValid);

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });

    }


    render() {

        // console.log(this.state.orderForm);
        const formElements = [];
        for (let key in this.state.orderForm) {

            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        // console.log(formElements);


        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElements.map(formElement => {
                        return (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputChangeHandler(event, formElement.id)} />
                        );
                    })
                }
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <p>Loading ...</p>;
        }

        return (

            <div className={classes.ContactData}>
                <h4>Enter your Data</h4>
                {form}
            </div>
        );
    }
}

export default WithErrorHandler(ContactData, axios);
