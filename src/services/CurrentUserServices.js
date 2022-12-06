
import { CurrentUserDS } from "../model";

let currentUser = null;

export async function getCurrentUser() {
  if (currentUser != null) return currentUser;
  try {
    currentUser = await CurrentUserDS.getCurrentUser();
  } finally {
  }
  return currentUser;
}
