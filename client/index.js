const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list?

  
  /* -----------------SOLUTION--------------------------- */

  // Instantiating a MerkleTree Class
  const merkleTree = new MerkleTree(niceList);

  // generating the RootHash of the Tree instantiated above
  const root = merkleTree._getRoot();

  // name to verify
  const name = "Erick Glover";

  // index of name above in the niceList
  const index = niceList.findIndex( n => n === name);

  // Getting the proof form the merkle tree
  const proof = merkleTree.getProof(index);

// Sending a Post Request to the server.
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name, proof
  });

  console.log({ gift });
}

main();