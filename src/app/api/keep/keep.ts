import { getApi } from '../config/appConfig';

export async function postKeep(CocktailId: string) {
  const res = await fetch(`${getApi}/me/bar/${CocktailId}/keep`, {
    method: 'POST',
    credentials: 'include',
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    console.error();
  }
  return payload;
}

export async function deleteKeep(CocktailId: string) {
  const res = await fetch(`${getApi}/me/bar/${CocktailId}/keep`, {
    method: 'DELETE',
    credentials: 'include',
  });
  let payload = null;
  try {
    payload = await res.json();
  } catch {
    console.error();
  }
}
