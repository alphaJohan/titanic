import csv from 'csvtojson';
import math from 'mathjs';
import Passenger from './types/Passenger';

const getColumn = (A, colIndex) => {
  const size = A.size();
  const rowCount = size[0];
  return math.subset(A, math.index(math.range(0, rowCount), colIndex));
};

const setColumn = (A, column, colIndex) => {
  const size = A.size();
  const rowCount = size[0];
  A.subset(math.index(math.range(0, rowCount), colIndex), column);
};

const importData = fileName => new Promise((resolve) => {
  const result = [];
  csv()
    .fromFile(fileName)
    .on('csv', (csvRow) => {
      result.push(new Passenger(csvRow));
    })
    .on('done', () => {
      resolve(result);
    });
});

const convertToMatrix = (passengers) => {
  const features = [];
  passengers.forEach((passenger) => {
    features.push(passenger.features());
  });
  return features;
};

const normalize = (matrix) => {
  const B = math.matrix().resize(matrix.size());
  const columns = matrix.size()[1];
  for (let i = 0; i < columns; i += 1) {
    const column = getColumn(matrix, i);
    const scaledColumn = math.divide(math.subtract(column, math.mean(column)), (math.max(column) - math.min(column)));
    setColumn(B, scaledColumn, i);
  }
  return B;
};

const scale = (matrix) => {
  const B = math.matrix().resize(matrix.size());
  const columns = matrix.size()[1];
  for (let i = 0; i < columns; i += 1) {
    const column = getColumn(matrix, i);
    const scaledColumn = math.divide(math.subtract(column, math.min(column)), (math.max(column) - math.min(column)));
    setColumn(B, scaledColumn, i);
  }
  return B;
};

export {
  importData,
  convertToMatrix,
  normalize,
  getColumn,
  setColumn,
  scale,
};
