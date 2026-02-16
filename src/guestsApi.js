const baseUrl = 'https://express-guest-list-api-memor.edson-junior.deno.net';

export function fetchGuests() {
  return fetch(`${baseUrl}/guests`).then((res) => res.json());
}

export function addGuest(guest) {
  return fetch(`${baseUrl}/guests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(guest),
  });
}

export function updateGuest({ id, attending }) {
  return fetch(`${baseUrl}/guests/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ attending: attending }),
  });
}

export function deleteGuest(id) {
  return fetch(`${baseUrl}/guests/${id}`, { method: 'DELETE' });
}
