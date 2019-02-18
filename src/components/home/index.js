import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TEST_CONNECTION } from "actions/config";
import AttributeSearch from "attributes/search";
import AttributeList from "attributes/list";

class Home extends React.PureComponent {
    static propTypes = {
        loggedIn: PropTypes.bool
    }

    render() {
        const { loggedIn } = this.props;

        if (!loggedIn) {
            return (
                <h1>Not logged in, please set your credentials via the "Change instance" button in the top right</h1>
            );
        }

        return (    
            <div>
                <AttributeSearch />
                <AttributeList />
            </div>
        );
    }
}

const mapStateToProps = ({ config }) => ({
    loggedIn: config.loggedIn
});

export default connect(mapStateToProps)(Home);
