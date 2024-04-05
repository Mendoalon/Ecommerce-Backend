export interface UserDto {
  _id: string;
  name: string;
  email: string;
  password: string;
  roles: string[];
  img?: string;
}