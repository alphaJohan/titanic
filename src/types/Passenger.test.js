import Passenger from './Passenger';

describe('Passenger type', () => {
  const csvRow = [1, 0, 3, 'Braund, Mr. Owen Harris', 'male', 22, 1, 0, 'A/5 21171', 7.25, '', 'S'];
  const passenger = new Passenger(csvRow);
  it('should create Passenger from csv row', () => {
    const expectedPassenger = {
      passengerId: 1,
      survived: 0,
      class: 3,
      name: 'Braund, Mr. Owen Harris',
      sex: 'male',
      age: 22,
      sibsp: 1,
      parch: 0,
      ticket: 'A/5 21171',
      fare: 7.25,
      cabin: '',
      embarked: 'S',
    };
    expect(passenger).toEqual(expectedPassenger);
  });
  it('sexAsInt should return 1 for male', () => {
    expect(passenger.sexAsInt()).toBe(1);
  });
  it('sexAsInt should return 0 for values other than male', () => {
    const femalePassenger = new Passenger(csvRow);
    femalePassenger.sex = 'female';
    expect(femalePassenger.sexAsInt()).toBe(0);
  });
  it('features() should return expected features', () => {
    const expectedFeatures = [3, 1, 22, 1, 0];
    expect(passenger.features()).toEqual(expectedFeatures);
  });
  it('y() should return value for survived', () => {
    expect(passenger.y()).toEqual([0]);
  });
});
