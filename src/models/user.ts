class User {
  username: string;
  email: string;
  password: string;
  constructor(username: string, password: string, email: string) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}

class UserInfo {
  id: string;
  username: string;
  email: string;
  constructor(id: string, username: string, email: string) {
    this.id = id;
    this.username = username;
    this.email = email;
  }
}

export { User, UserInfo };
