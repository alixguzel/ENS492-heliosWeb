import { Helios } from "https://cdn.skypack.dev/helios-web?min";

const fs = require('fs');
const zlib = require('zlib');

const nodes = {};

fs.createReadStream('file.jsons.gz')
  .pipe(zlib.createGunzip())
  .on('data', (data) => {
    const json = JSON.parse(data.toString());
    nodes[parseInt(json.id_str)] = json;
  })
  .on('end', () => {
    console.log(nodes);
  });

// Nodes are dictionaries (any key can be used as node properties)


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