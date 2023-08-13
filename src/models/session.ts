export class Session {
  id: string;
  building: string;
  topic: string;
  startTime: string;
  endTime: string;

  constructor(id: string, building: string, topic: string, startTime: string, endTime: string) {
    this.id = id;
    this.building = building;
    this.topic = topic;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
