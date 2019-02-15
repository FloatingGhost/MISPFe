import React from "react";
import { connect } from "react-redux";
import { SEARCH_EVENTS } from "actions/events";
import { Header, Segment } from "semantic-ui-react";

class ViewEvent extends React.Component {
    componentDidMount() {
        this.props.searchEvents({ eventid: this.props.match.params.id });
    }

    render() {
        const { events, loading } = this.props;
        if (loading) return "loading...";

        const event = events[0].Event;

        return (
            <Segment inverted>
                <Header as="h1">Event {event.id}: {event.info}</Header>
            </Segment>
        );
    }
}

const mapStateToProps = ({ events: { events, loading }}) => ({
    events, loading
});

const mapDispatchToProps = dispatch => ({
    searchEvents: (params) => dispatch({type: SEARCH_EVENTS, data: params})
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent);
