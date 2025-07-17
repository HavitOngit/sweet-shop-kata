import { SweetRepository } from "./src/repositories/sweet.repository";
import {
  SweetService,
  type ISweetService,
} from "./src/services/sweets.service";

export function createSweetShop(): ISweetService {
  const repository = new SweetRepository();
  return new SweetService(repository);
}
