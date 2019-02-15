import loadable from "loadable-components";
import React from "react";
import { Segment } from "semantic-ui-react";

const Placeholder = () => (
    <Segment loading />
);
const load_options = { LoadingComponent: () => <Placeholder /> };

const routes = [
    { path: "/", component: () => import("home/index") },
    { path: "/events", component: () => import("events/list") },
    { path: "/events/:id", component: () => import("events/view") }
];

const process_components = (components, base_route="") => {
    var flattened = [];
    components.forEach(c => {
        if (c.prefix) {
            // It's a sub-route, recurse
            const sub_components = process_components(c.components, base_route + c.prefix);
            flattened = flattened.concat(sub_components);
        } else {
            // It's a leaf, append to flattened
            flattened.push({ path: base_route + c.path,
                component: loadable(c.component,load_options)
            });
        }
    });

    return flattened;
};

const async_routes = process_components(routes);

export default async_routes;
