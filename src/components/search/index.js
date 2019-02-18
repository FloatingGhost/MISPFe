import React from "react";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import AttributeType from "search/attribute-types";
import AttributeCategory from "search/attribute-categories";

const ParameterInput = ({ name, type, value, onChange, ...props }) => {
    switch (type) {
        case "boolean":
            return <Form.Dropdown value={value} label={name} name={name} 
                        selection
                        inverted
                        fluid
                        options={[{text: "true", value: true}, {text: "false", value: false}]}
                        onChange={(e, {checked}) => onChange(e, {name, value: checked})}
                        {...props}
                    />;
        case "attr-type":
            return <AttributeType
                    value={value} label={name} name={name} onChange={onChange}
                    {...props}
            />;
        case "attr-category":
            return <AttributeCategory
                    value={value} label={name} name={name} onChange={onChange}
                    {...props}
            />;
        default: 
            return <Form.Input 
                value={value} label={name} name={name} onChange={onChange} 
                {...props}
            />;
    }
};

const SearchInput = ({ parameters, value, onChange }) => {
    const propValue = value;
    const mappedOnChange = (e, {name, value}) => {
        onChange(e, Object.assign({}, propValue, {[name]: value}));
    }

    const addParam = (e, {name, value}) => {
        const paramType = parameters[value];
        const initialValue = {
            "string": "",
            "boolean": true,
            "attr-type": "text",
            "attr-category": "Internal reference"
        }[paramType];

        onChange(e, Object.assign({}, propValue, {[value]: initialValue}));
    }

    const removeParam = (e, key) => {  
        const newState = Object.assign({}, value);
        delete newState[key];
        onChange(e, newState);
    }

    return (
        <div>
            { Object.keys(value).map(key => {
                const paramType = parameters[key];
                return (
                    <Form.Group>
                        <ParameterInput 
                            name={key} value={value[key]}
                            type={paramType} onChange={mappedOnChange}
                            width={14}
                        />
                        <Form.Button
                            type="button"
                            fluid
                            color="black"
                            style={{marginTop: "1.5rem"}}
                            content="Remove"
                            icon="delete"
                            onClick={(e) => removeParam(e, key)}
                        />
                    </Form.Group>
                )
            })}
            <Form.Dropdown
                placeholder="Add more filters..."
                fluid
                search
                value={null}
                options={
                    Object.keys(parameters).filter(x => !Object.keys(value).includes(x)).map(
                        key => (
                            { text: key, value: key }
                        ))
                }
                onChange={addParam}
            />
        </div>
    );
}

export default SearchInput;
