import { Helios } from "https://cdn.skypack.dev/helios-web?min";
// Currently not working. please download and follow the build instructions.
// This will be fixed in the next release

// Nodes are dictionaries (any key can be used as node properties)
let nodes = {
"0": {
    label: "Node 0"
},
"1": {
    label: "Node 1"
},
"2": {
    label: "Node 2"
},
"3": {
    label: "Node 3"
},
};

// Edges are arrays of node ids
let edges = [
{
    source: "0",
    target: "1"
},
{
    source: "1",
    target: "2"
},
{
    source: "2",
    target: "0"
},
{
    source: "2",
    target: "3"
}
];

let helios = new Helios({
elementID: "netviz", // ID of the element to render the network in
nodes: nodes, // Dictionary of nodes
edges: edges, // Array of edges
use2D: false // Choose between 2D or 3D layouts
});