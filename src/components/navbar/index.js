import React from "react";
import PropTypes from "prop-types";
import { Menu, Image, Icon, Label } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import ConfigChanger from "config/index";

export default class NavBar extends React.Component {
    render() {
        return (
            <Menu borderless inverted stackable>
                <Menu.Item>
                    <NavLink
                        to="/"
                    >
                        <Image src="/resources/img/misp-small.png" inline height="40vh" />
                    </NavLink>
                </Menu.Item>
                <Menu.Menu position="right">
                    <ConfigChanger />
                </Menu.Menu>
            </Menu>
        );
    }
}