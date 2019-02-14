import React from "react";
import ReactTable from "react-table";
import { post } from "utils";

export default class EventList extends React.Component {

    state = {
        events: [],
        loading: true
    }

    getEvents = async ({page, pageSize}) => {
        this.setState({loading: true});
        let response = await post("/events/index", {limit: pageSize, page: page});
        let json = await response.json();
        this.setState({events: json, loading: false});
    }

    render() {
        const columns = [
            { Header: "ID", accessor: "id" },
            { Header: "Date", accessor: "date" },
            { Header: "Info", accessor: "info" },
        ];

        return (
            <ReactTable
                manual
                columns={columns}
                data={this.state.events}
                onFetchData={this.getEvents}
                keyField="id"
                loading={this.state.loading}                
            />
        );
    }
}
