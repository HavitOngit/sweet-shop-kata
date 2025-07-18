import type { SweetModel } from "./src/models/sweet.model";
import { SweetRepository } from "./src/repositories/sweet.repository";
import {
  SweetService,
  type ISweetService,
} from "./src/services/sweets.service";

export function createSweetShop(
  map: Map<string, SweetModel> = new Map(),
): ISweetService {
  const repository = new SweetRepository(map);
  return new SweetService(repository);
}
