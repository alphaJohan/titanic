import math from 'mathjs';
import * as data from './data';

describe('import', () => {
  const promise = data.importData('data/train.csv');
  it('should import all passengers', () => promise.then((passengers) => {
    expect(passengers).toHaveLength(891);
    const passenger = passengers[0];
    expect(passenger.features()).toEqual([3.0, 1.0, 22.0, 1.0, 0.0]);
    expect(passenger.y()).toEqual([0.0]);
  }));
});

describe('helper functions', () => {
  it('getColumn() should return column matrix of matrix', () => {
    const A = math.matrix([
      [1, 3],
      [5, 10],
    ]);
    const expectedColumn = math.matrix([[3], [10]]);
    const column = data.getColumn(A, 1);
    expect(column).toEqual(expectedColumn);
  });
  it('setColumn() should set column in matrix', () => {
    const A = math.matrix([
      [1, 3],
      [5, 10],
    ]);
    const column = [[2], [4]];
    const expectedMatrix = math.matrix([
      [1, 2],
      [5, 4],
    ]);
    data.setColumn(A, column, 1);
    expect(A).toEqual(expectedMatrix);
  });
  it('normalize() should normalize', () => {
    const A = math.matrix([
      [1, 5],
      [5, 10],
    ]);
    // (x - mean(x)) / (max(x) - min(x))
    const expectedMatrix = math.matrix([
      [-0.5, -0.5],
      [0.5, 0.5],
    ]);
    const normalized = data.normalize(A);
    expect(normalized).toEqual(expectedMatrix);
  });
  it('scale() should re-scale', () => {
    const A = math.matrix([
      [1, 5],
      [3, 6],
      [5, 10],
    ]);
    // (x - min(x)) / (max(x) - min(x))
    const expectedMatrix = math.matrix([
      [0, 0],
      [0.5, 0.2],
      [1, 1],
    ]);
    const scaled = data.scale(A);
    expect(scaled).toEqual(expectedMatrix);
  });
  it('convertToMatrix should convert to matrix', () => {
    // 1,0,3,"Braund, Mr. Owen Harris",male,22,1,0,A/5 21171,7.25,,S
    // 2,1,1,"Cumings, Mrs. John Bradley (Florence Briggs Thayer)",female,38,1,0,PC 17599,71.2833,C85,C

    const passenger1 = new data.Passenger();
  });
});
