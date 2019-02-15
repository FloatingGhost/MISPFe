import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { SEARCH_ATTRIBUTES } from "actions/attributes";

class AttributeSearch extends React.PureComponent {
    state = {
        searchTerm: ""
    }

    submit = () => {
        this.props.search({ value: this.state.searchTerm });
    }

    render() {
        return (
            <Form inverted>
                <Form.Group>
                    <Form.Input
                        width={14}
                        placeholder="8.8.8.8"
                        value={this.state.searchTerm}
                        onChange={(e, {value}) => this.setState({searchTerm: value})}
                    />

                    <Form.Button
                        color="black"
                        width={2}
                        onClick={this.submit}
                        icon="search"
                        content="Search"
                        fluid
                    />
                </Form.Group>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    search: (term) => dispatch({type: SEARCH_ATTRIBUTES, data: term})
});

export default connect(null, mapDispatchToProps)(AttributeSearch);
