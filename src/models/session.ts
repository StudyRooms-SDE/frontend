import type { fileResponse } from './fileResponse';
import type { roomResponse } from './roomResponse';

export class SessionResponse {
  sessionId: string;
  building: string;
  subject: string;
  startTime: string;
  endTime: string;

  constructor(
    sessionId: string,
    building: string,
    subject: string,
    startTime: string,
    endTime: string,
  ) {
    this.sessionId = sessionId;
    this.building = building;
    this.subject = subject;
    this.startTime = startTime;
    this.endTime = endTime;
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

  constructor(
    sessionId: string,
    building: string,
    subject: string,
    topic: string,
    date: string,
    startTime: string,
    endTime: string,
  ) {
    this.sessionId = sessionId;
    this.building = building;
    this.subject = subject;
    this.topic = topic;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

export class SessionDetails {
  sessionId: string;
  subject: string;
  topic: string;
  startTime: string;
  endTime: string;
  room: roomResponse;
  files: fileResponse[];

  constructor(
    sessionId: string,
    subject: string,
    topic: string,
    startTime: string,
    endTime: string,
    room: roomResponse,
    files: fileResponse[],
  ) {
    this.sessionId = sessionId;
    this.subject = subject;
    this.topic = topic;
    this.startTime = startTime;
    this.endTime = endTime;
    this.room = room;
    this.files = files;
  }
}
