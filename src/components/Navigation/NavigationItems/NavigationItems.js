import React from 'react';
import classes from '../NavigationItems/NavigationItems.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
        <NavigationItem link = "/" exact>Burger Builder</NavigationItem>
        <NavigationItem link = "/orders">Orders</NavigationItem>
        <NavigationItem link = "/auth">Authenticate</NavigationItem>

    </ul>

);

export default navigationItems;