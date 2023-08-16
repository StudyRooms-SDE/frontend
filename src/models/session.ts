import type { FileResponse } from './fileResponse';
import type { RoomResponse } from './roomResponse';

export class SessionResponse {
  sessionId: string;
  building: string;
  subject: string;
  topic: string;
  startTime: string;
  endTime: string;
  createdByUser: boolean;

  constructor(
    sessionId: string,
    building: string,
    subject: string,
    topic: string,
    startTime: string,
    endTime: string,
    createdByUser: boolean,
  ) {
    this.sessionId = sessionId;
    this.building = building;
    this.subject = subject;
    this.topic = topic;
    this.startTime = startTime;
    this.endTime = endTime;
    this.createdByUser = createdByUser;
  }
}

export class PrintableSession {
  sessionId: string;
  building: string;
  subject: string;
  topic: string;
  date: string;
  startTime: string;
  endTime: string;
  createdByUser: boolean;

  constructor(
    sessionId: string,
    building: string,
    subject: string,
    topic: string,
    date: string,
    startTime: string,
    endTime: string,
    createdByUser: boolean,
  ) {
    this.sessionId = sessionId;
    this.building = building;
    this.subject = subject;
    this.topic = topic;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.createdByUser = createdByUser;
  }
}

export class SessionDetails {
  sessionId: string;
  subject: string;
  topic: string;
  startTime: string;
  endTime: string;
  createdByUser: boolean;
  room: RoomResponse;
  files: FileResponse[];

  constructor(
    sessionId: string,
    subject: string,
    topic: string,
    startTime: string,
    endTime: string,
    createdByUser: boolean,
    room: RoomResponse,
    files: FileResponse[],
  ) {
    this.sessionId = sessionId;
    this.subject = subject;
    this.topic = topic;
    this.startTime = startTime;
    this.endTime = endTime;
    this.createdByUser = createdByUser;
    this.room = room;
    this.files = files;
  }
}

export class SessionRequest {
  roomId: string;
  subject: string;
  topic: string;
  startTime: string;
  endTime: string;

  constructor(roomId: string, subject: string, topic: string, startTime: string, endTime: string) {
    this.roomId = roomId;
    this.subject = subject;
    this.topic = topic;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
