import React from "react";
import { connect } from "react-redux";
import { SEARCH_EVENTS } from "actions/events";
import { Header, Segment, Statistic, Label } from "semantic-ui-react";
import { LocalAttributeList } from "attributes/list";

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

                <Label color={event.published?"green":"red"}
                    content={event.published?"Published":"Unpublished"}
                />

                <Statistic.Group inverted size="small">
                    <Statistic label="Attributes" value={event.attribute_count} />
                    <Statistic label="Analysis" value={event.analysis} />
                    <Statistic label="Threat Level" value={event.threat_level_id} />
                </Statistic.Group>

                <LocalAttributeList attributes={event.Attribute} />
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
