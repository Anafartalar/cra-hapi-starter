import React from "react";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
//import { browserHistory } from 'react-router';



const drawer = ({ open, setDrawerStatus,navigateTo }) => {

    const menuItemClicked = (path) => {
        navigateTo(path);
        setDrawerStatus(false);
    };


    return (
        <Drawer open={open} onRequestChange={(status) => setDrawerStatus(status)} docked={false}>
            <MenuItem onTouchTap={() => menuItemClicked("/")}>
                Ana Sayfa
            </MenuItem>
            <MenuItem onTouchTap={() => menuItemClicked("/about")}>
                Hakkımızda
            </MenuItem>
        </Drawer>
    );
};

export default drawer;
