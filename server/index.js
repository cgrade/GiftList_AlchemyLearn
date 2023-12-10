const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'a1a47fdb2d2171fc16147d4e9b21a78cfefec96299a7f07b00fe22f18020b7af';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { name, proof }= req.body;

  /*
    TODO: prove that a name is in the list

    SOLUTION:
      - get the parameters from the request body (frontend)
      - pass these parameters into the verifyProof func from MerkleTree Class
  */
  
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

  // check and return a response depending on a truety or falsy value.
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
