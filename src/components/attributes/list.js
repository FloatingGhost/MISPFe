import React from "react";
import ReactTable from "react-table";
import { post } from "utils";
import { connect } from "react-redux";
import { SEARCH_ATTRIBUTES } from "actions/attributes";

const AttributeList = ({ loading, attributes, pages, searchParams, searchAttributes }) => {
    const columns = [
        { Header: "Event ID", accessor: "event_id" },
        { Header: "Value", accessor: "value" },
        { Header: "Category", accessor: "category" }
    ];

    const search = ({ page, pageSize }) => {
        let searchParams = Object.assign({}, searchParams, { page, limit: pageSize });
        searchAttributes(searchParams);
    };

    return (
        <ReactTable
            manual
            sortable={false}
            columns={columns}
            data={attributes}
            onFetchData={search}
            keyField="id"
            loading={loading}                
            pages={pages}
        />
    );
}

const mapStateToProps = ({ attributes: { attributes, pages, loading }}) => ({
    attributes,
    pages,
    loading
});

const mapDispatchToProps = dispatch => ({
    searchAttributes: (params) => dispatch({type: SEARCH_ATTRIBUTES, data: params})
});

export default connect(mapStateToProps, mapDispatchToProps)(AttributeList);
