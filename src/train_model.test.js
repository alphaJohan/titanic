// import brain from 'brain.js';
// import csvToJson from 'convert-csv-to-json';
import myModel from './train_model';

describe('Titanic ', () => {
  it('should use brain.js', () => {
    expect(myModel()[0]).toBeGreaterThan(0.93);
  });

  // it('should import data', () => {
  //   const dataArr = csvToJson.fieldDelimiter(',').getJsonFromCsv('data/train.csv');
  //   console.log(dataArr);
  // });
});
