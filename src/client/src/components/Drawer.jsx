import React from "react";
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';



const drawer = ({ open, setDrawerStatus,navigateTo }) => {

    const menuItemClicked = (path) => {
        navigateTo(path);
        setDrawerStatus(false);
    };


    return (
        <Drawer open={open} onRequestChange={(status) => setDrawerStatus(status)} docked={false}>
            <MenuItem onTouchTap={() => menuItemClicked("/")}>
                Home
            </MenuItem>
            <MenuItem onTouchTap={() => menuItemClicked("/about")}>
                About
            </MenuItem>
        </Drawer>
    );
};

export default drawer;
