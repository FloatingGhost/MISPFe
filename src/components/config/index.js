import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { setInstanceDetails } from "actions/config";

class Config extends React.Component {
    static propTypes = {
        url: PropTypes.string,
        apikey: PropTypes.string
    }

    state = {
        open: false  
    }

    onChange = (e, {name, value}) => this.setState({[name]: value})

    submit = () => {
        this.props.setInstanceDetails(this.state.url, this.state.apikey);
    }

    render() {
        return (
            <Modal
                basic
                open={this.state.open}
                onOpen={() => this.setState({open: true,
                                             url: this.props.url, 
                                             apikey: this.props.apikey})}
                onClose={() => this.setState({open: false})}
                trigger={<Menu.Item>Change Instance</Menu.Item>}
            >
                <Modal.Content>
                    <Form inverted>
                        <Form.Input
                            name="url"
                            value={this.state.url}
                            label="URL"
                            placeholder="https://..."
                            onChange={this.onChange}
                        />
                        <Form.Input
                            name="apikey"
                            value={this.state.apikey}
                            label="API Key"
                            placeholder="MYAPIKEY"
                            onChange={this.onChange}
                        />

                        <Form.Button
                            content="Submit"
                            onClick={this.submit}
                        />
                    </Form>
                </Modal.Content>
            </Modal>
        );
    } 
}

const mapStateToProps = ({ config }) => ({
    url: config.url,
    apikey: config.apikey
});

const mapDispatchToProps = {
    setInstanceDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(Config);
