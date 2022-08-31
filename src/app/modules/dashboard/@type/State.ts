import { Alert, Message, User } from ".";
import { Mission } from "../../../shared/models";
import { Company } from "../models";

export interface State {
  alerts?: Alert[];
  messages?: Message[];
  missions?: Mission[];
  user?: User;
  company?: Company;
}
