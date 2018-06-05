import brain from 'brain.js';

const myModel = () => {
  const config = {
    binaryThresh: 0.5, // ¯\_(ツ)_/¯
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // Supported activation types ['sigmoid', 'relu', 'leaky-relu', 'tanh']
  };
  // create a simple feed forward neural network with back-propagation
  // const net = new brain.NeuralNetwork(config);
  const net = new brain.NeuralNetwork();

  net.train([{ input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] }]);

  const output = net.run([1, 0]);
  console.log(output);
  return output;
};

export default myModel;
