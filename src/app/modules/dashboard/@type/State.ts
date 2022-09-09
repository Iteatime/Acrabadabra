import { Alert, Message, User } from ".";
import { Company, Mission } from "../../../shared/models";

export interface State {
  alerts?: Alert[];
  messages?: Message[];
  missions?: Mission[];
  user?: User;
  company?: Company;
}
