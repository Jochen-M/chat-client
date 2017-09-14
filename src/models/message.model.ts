export class Message {
  _id: string;
  f_user: any;
  t_user: any;
  content: string;
  type: string;
  created_at: any;

  constructor(f_user, t_user, content) {
    this.f_user = f_user;
    this.t_user = t_user;
    this.content = content;
  };
}
