export class roomResponse {
  id: string;
  name: string;
  building: string;
  latitude: number;
  longitude: number;
  address: string;

  constructor(
    id: string,
    name: string,
    building: string,
    latitude: number,
    longitude: number,
    address: string,
  ) {
    this.id = id;
    this.name = name;
    this.building = building;
    this.latitude = latitude;
    this.longitude = longitude;
    this.address = address;
  }
}
