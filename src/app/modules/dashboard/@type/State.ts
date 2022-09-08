import { Alert, Message, User } from ".";
import { Company, Mission } from "../models";

export interface State {
  alerts?: Alert[];
  messages?: Message[];
  missions?: Mission[];
  user?: User;
  company?: Company;
}
