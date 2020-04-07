import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';

const UserMenu = ({user, logout}) => {
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                Hello, {user.displayName}!
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                    View profile
                </DropdownItem>
                <DropdownItem tag={RouterNavLink} to="/track-histories" exact>
                    Track history
                </DropdownItem>
                <DropdownItem tag={RouterNavLink} to="/artists/new" exact>
                    Add artist
                </DropdownItem>
                <DropdownItem tag={RouterNavLink} to="/albums/new" exact>
                    Add album
                </DropdownItem>
                <DropdownItem tag={RouterNavLink} to="/tracks/new" exact>
                    Add track
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={logout}>
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default UserMenu;