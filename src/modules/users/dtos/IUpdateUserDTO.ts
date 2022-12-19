export default interface IUpdateUserDTO {
  id: string;
  userId: string;
  name?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
  about?: string;
}
