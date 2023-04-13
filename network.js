import { Helios } from "https://cdn.skypack.dev/helios-web?min";

// Nodes are dictionaries (any key can be used as node properties)
const nodes = {};

console.log("Here")

fetch("dataverse_files/networks/nodes/follower_profiles_2022-09.jsons.gz")
  .then(response => response.blob())
  .then(blob => {
    const reader = new FileReader();
    console.log("Here2")
    reader.onload = function() {
      const jsons = reader.result.split('\\n').filter(Boolean).map(JSON.parse);

      for (let i = 0; i < jsons.length; i++) {
        nodes[jsons[i].id_str] = jsons[i];
        console.log("Here3")
      }

      console.log(nodes);
    };
    reader.readAsText(blob);
  });

console.log("Here4")

/*
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
*/

// Edges are arrays of node ids
const edges = [];


const filePath = "dataverse_files/networks/edges/2022-09/11711022_network.json.gz";

function unzipFile(file) {
  return fetch(file)
    .then((response) => response.arrayBuffer())
    .then((buffer) => pako.inflate(buffer, { to: "string" }))
    .then((inflated) => JSON.parse(inflated));
}

function getFileName(file) {
  return file.split("/").pop().split("_")[0];
}

function processFile(file) {
  return unzipFile(file).then((data) => {
    const fileName = getFileName(file);
    data.friends.forEach((friend) => {
      edges.push({ source: friend, target: fileName });
    });
  });
}

async function processFiles() {
  await processFile(filePath);
}

processFiles().then(() => console.log(edges));



/*
const mainFolder = "dataverse_files/networks/edges/2022-09";

function getFiles() {
  return fetch(mainFolder)
    .then((response) => response.json())
    .then((data) => data.filter((file) => file.endsWith(".json.gz")));
}

function unzipFile(file) {
  return fetch(`${mainFolder}/${file}`)
    .then((response) => response.arrayBuffer())
    .then((buffer) => pako.inflate(buffer, { to: "string" }))
    .then((inflated) => JSON.parse(inflated));
}

function getFileName(file) {
  return file.split("_")[0];
}

function processFile(file) {
  return unzipFile(file).then((data) => {
    const fileName = getFileName(file);
    data.friends.forEach((friend) => {
      edges.push({ source: friend, target: fileName });
    });
  });
}

async function processFiles() {
  const files = await getFiles();
  await Promise.all(files.map(processFile));
}

processFiles().then(() => console.log(edges));

console.log(edges);
*/

let helios = new Helios({
elementID: "netviz", // ID of the element to render the network in
nodes: nodes, // Dictionary of nodes
edges: edges, // Array of edges
use2D: false // Choose between 2D or 3D layouts
});