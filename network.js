import { Helios } from "https://cdn.skypack.dev/helios-web?min";

// Nodes are dictionaries (any key can be used as node properties)
const nodes = {};

fetch('dataverse_files/networks/nodes/follower_profiles_2022-09.jsons.gz')
  .then(response => response.blob())
  .then(blob => {
    const reader = new FileReader();
    reader.onload = function() {
      const jsons = JSON.parse(reader.result);

      for (let i = 0; i < jsons.length; i++) {
        nodes[jsons[i].id_str] = jsons[i];
      }

      console.log(nodes);
    };
    reader.readAsText(blob);
  });


// Edges are arrays of node ids
const edges = [];

fetch('dataverse_files/networks/edges')
  .then(response => response.json())
  .then(jsons => {
    jsons.filter((filename) => filename.endsWith('.jsons.gz'))
      .forEach((filename) => {
        const id = filename.match(/(\d+)_network.jsons.gz/)[1];
        fetch(`edges/${filename}`)
          .then(response => response.blob())
          .then(blob => {
            const reader = new FileReader();
            reader.onload = function() {
              const json = JSON.parse(zlib.gunzipSync(reader.result).toString());
              json.friends.forEach((friend) => {
                edges.push({ source: friend, target: id });
              });
            };
            reader.readAsText(blob);
          });
      });
  });

console.log(edges);


let helios = new Helios({
elementID: "netviz", // ID of the element to render the network in
nodes: nodes, // Dictionary of nodes
edges: edges, // Array of edges
use2D: false // Choose between 2D or 3D layouts
});