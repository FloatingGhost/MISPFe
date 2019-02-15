import React from "react";
import ReactTable from "react-table";
import { post } from "utils";
import { connect } from "react-redux";
import { SEARCH_EVENTS } from "actions/events";

const EventList = ({ loading, events, pages, getEvents }) => {
    const columns = [
        { Header: "ID", accessor: "Event.id" },
        { Header: "Date", accessor: "Event.date" },
        { Header: "Info", accessor: "Event.info" },
    ];

    const search = ({ page, pageSize }) => getEvents({ page: page + 1, limit: pageSize });

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
    pages: events.pages
});

const mapDispatchToProps = dispatch => ({
    getEvents: (params) => dispatch({type: SEARCH_EVENTS, data: params})
});

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
