import { BaseError } from "./BaseError";

export class NotClientError extends BaseError {
  constructor(message: string) {
    super(message, 402);
  }
}