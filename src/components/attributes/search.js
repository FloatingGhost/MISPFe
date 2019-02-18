import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { SEARCH_ATTRIBUTES } from "actions/attributes";
import SearchInput from "search/index";

class AttributeSearch extends React.PureComponent {
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
            "category": "string",
            "org": "string",
            "tags": "string",
            "from": "string",
            "to": "string",
            "last": "string",
            "eventid": "string",
            "withAttachments": "string",
            "uuid": "string",
            "publish_timestamp": "string",
            "timestamp": "string",
            "enforceWarninglist": "string",
            "to_ids": "boolean",
            "deleted": "boolean",
            "includeEventUuid": "boolean",
            "includeEventTags": "boolean",
            "event_timestamp": "string",
            "threat_level_id": "string"
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
    search: (term) => dispatch({type: SEARCH_ATTRIBUTES, data: term})
});

export default connect(null, mapDispatchToProps)(AttributeSearch);
