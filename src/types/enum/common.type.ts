import { User } from 'src/auth/entity/register.entity';

export interface GenerateOTPOptions {
  digits: boolean;
  lowerCaseAlphabets: boolean;
  upperCaseAlphabets: boolean;
  specialChars: boolean;
}

export interface PaginationResponse<T> {
  meta: Metadata;
  data: T[];
}

export interface Metadata {
  count: number;
  limit: number;
  page: number;
  totalPages: number;
}

export enum AuthorizationHeader {
  BEARER = 'Bearer Authorization',
}

export enum RegexError {
  ALPHABETIC = 'must only contain letters and spaces',
  ALPHANUMERIC = 'must only contain letters, numbers, and spaces',
  NUMERIC = 'must only contain numbers',
}

export interface SuccessResponse {
  url: string;
  filename: string;
  mimetype: string;
}

export type ConnectionProtocol = 'http' | 'ws';

export enum ConnectionType {
  WS = 'ws',
  HTTP = 'http',
}

/* export interface RequestUser {
  user?: UserEntity;
}

export interface CustomRequest extends Request {
  user: RequestUser;
} */
export interface CustomRequest extends Request {
  user: User;
}

// export interface CustomOTPRequest extends Request {
//   otp: OTP;
// }

export interface JWT {
  id: number;
  email: string;
}
export interface StripeCustomer {
  email: string;
}
export interface CardDetails {
  holderName: string;
  number: number;
  expDate: Date;
  CVV: number;
}
export interface FundsEmailSenderDetails {
  senderName: string;
  senderEmail: string;
  amount: number;
  recieverEmail: string;
  transactionDate: Date;
  serviceFee: number;
}
export interface FundsEmailRecieverDetails {
  senderEmail: string;
  recieverName: string;
  senderName: string;
  amount: number;
  recieverEmail: string;
  transactionDate: Date;
  serviceFee: number;
  phone?: string;
}
