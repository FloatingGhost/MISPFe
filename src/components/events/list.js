import React from "react";
import ReactTable from "react-table";
import { post } from "utils";
import { connect } from "react-redux";
import { SEARCH_EVENTS } from "actions/events";
import { NavLink } from "react-router-dom";
import { Button } from "semantic-ui-react";

const EventList = ({ loading, events, pages, searchParams, getEvents }) => {
    const columns = [
        { Header: "ID", accessor: "Event.id", minWidth: 10 },
        { Header: "Date", accessor: "Event.date", minWidth: 15 },
        { Header: "Info", accessor: "Event.info" },
        { Header: "To Event", accessor: "Event.id", Cell: d => <NavLink to={`/events/${d.value}`}><Button color="black" icon="arrow right" /></NavLink>, minWidth: 10}
    ];

    const search = ({ page, pageSize }) => {
        let searchParams = Object.assign({}, searchParams, { page: page + 1, limit: pageSize });
        getEvents(searchParams);
    }

    return (
        <ReactTable
            manual
            columns={columns}
            data={events}
            onFetchData={search}
            keyField="Event.id"
            loading={loading}                
            pages={pages}
        />
    );
}

const mapStateToProps = ({ events }) => ({
    events: events.events,
    loading: events.loading,
    pages: events.pages,
    searchParams: events.searchParams,
});

const mapDispatchToProps = dispatch => ({
    getEvents: (params) => dispatch({type: SEARCH_EVENTS, data: params})
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
