import React, { Component } from 'react';
import {connect} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/button';
import classes from './Auth.module.css';
import axios from 'axios';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {

        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp : true,
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

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            }
        };

        this.setState({ controls: updatedControls });

    }

    signUpHandler = (event) => {

        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
        // const authData = {
        //     email: this.state.controls['email'].value,
        //     password: this.state.controls['password'].value,
        //     returnSecureToken: true
        // }
        // let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLU6lISn1XBKHC5fCxPakUEV_XpeVZi2k";
        // if(!this.state.isSignUp) {
        //     url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLU6lISn1XBKHC5fCxPakUEV_XpeVZi2k";
        // }

        // axios.post(url, authData)
        //     .then(response => 
        //         {console.log(response)})
        //     .catch(err => {
        //         console.log(err)});

    }

    switchSignUpModeHandler = () => {

        this.setState(prevState =>{
            return {isSignUp : !prevState.isSignUp}
        });

    } 


    render() {

        const formElements = [];
        for (let key in this.state.controls) {

            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const form = formElements.map(formElement => {
            return (
                <Input className={classes.Input}
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangeHandler(event, formElement.id)}>
                </Input>
            );
        });

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.signUpHandler}>
                    {form}
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
                 <Button 
                 clicked = {this.switchSignUpModeHandler}
                 btnType="Danger" >SWITCH TO {this.state.isSignUp? 'SIGNIN' : 'SIGNUP'}</Button>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email, pwd) => dispatch(actions.auth(email, pwd)),
    }
}

export default connect(null,mapDispatchToProps)( Auth);