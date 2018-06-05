import csv from 'csvtojson';
import math from 'mathjs';

class Passenger {
  constructor(trainData) {
    [
      this.passengerId,
      this.survived,
      this.class,
      this.name,
      this.sex,
      this.age,
      this.sibsp,
      this.parch,
      this.ticket,
      this.fare,
      this.cabin,
      this.embarked,
    ] = trainData;
  }

  sexAsInt() {
    return this.sex === 'male' ? 1 : 0;
  }

  features() {
    return [
      Number.parseFloat(this.class),
      Number.parseFloat(this.sexAsInt()),
      Number.parseFloat(this.age),
      Number.parseFloat(this.sibsp),
      Number.parseFloat(this.parch),
    ];
  }

  y() {
    return [Number.parseFloat(this.survived)];
  }
}

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

};

const normalize = (matrix) => {
  const B = math.matrix().resize(matrix.size());
  const columns = matrix.size()[1];
  for (let i = 0; i < columns; i += 1) {
    const column = getColumn(matrix, i);
    const scaledColumn = math.divide(math.subtract(column, math.mean(column)), (math.max(column) - math.min(column)));
    // console.log(scaledColumn);
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
    // console.log(scaledColumn);
    setColumn(B, scaledColumn, i);
  }
  return B;
};

export {
  Passenger,
  importData,
  convertToMatrix,
  normalize,
  getColumn,
  setColumn,
  scale,
};
