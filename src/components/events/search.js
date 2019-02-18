import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { SEARCH_EVENTS } from "actions/events";
import SearchInput from "search/index";

class EventSearch extends React.PureComponent {
    state = {
        params: {value: ""}
    }

    submit = () => {
        this.props.search(this.state.params);
    }

    render() {
        const validSearch = {
            "value": "string",
            "type": "attr-type",
            "category": "attr-category",
            "org": "string",
            "tag": "string",
            "tags": "string",
            "searchall": "boolean",
            "from": "string",
            "to": "string",
            "last": "string",
            "eventid": "string",
            "withAttachments": "boolean",
            "metadata": "boolean",
            "uuid": "string",
            "published": "boolean",
            "publish_timestamp": "string",
            "timestamp": "string",
            "enforceWarninglist": "boolean"
        };

        return (
            <Form inverted>
                <SearchInput
                    parameters={validSearch}
                    value={this.state.params}
                    onChange={(e, value) => this.setState({params: value})}
                />
                <Form.Button
                    color="black"
                    onClick={this.submit}
                    icon="search"
                    content="Search"
                    fluid
                />
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    search: (term) => dispatch({type: SEARCH_EVENTS, data: term})
});

export default connect(null, mapDispatchToProps)(EventSearch);
