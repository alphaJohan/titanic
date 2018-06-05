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

export default Passenger;
