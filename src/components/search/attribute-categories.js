import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";

const AttributeCategoryDropdown = ({ categories, ...props }) => (
    <Form.Dropdown
        {...props}
        search
        fluid
        selection
        options={categories.map(cat => ({ text: cat, value: cat}))}
    />
);

const mapAttributeCategoriesToProps = ({ config: { attributeTypes: { categories }}}) => ({
    categories
});

export default connect(mapAttributeCategoriesToProps)(AttributeCategoryDropdown);
