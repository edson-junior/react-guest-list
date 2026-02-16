const baseUrl = 'https://express-guest-list-api-memor.edson-junior.deno.net';

export async function fetchGuests() {
  const response = await fetch(`${baseUrl}/guests`);
  const data = await response.json();
  return data;
}

export async function addGuest(guest) {
  const response = await fetch(`${baseUrl}/guests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(guest),
  });
  const data = await response.json();

  return data;
}

export async function updateGuest({ id, attending }) {
  const response = await fetch(`${baseUrl}/guests/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ attending: attending }),
  });
  const data = await response.json();

  return data;
}

export async function deleteGuest(id) {
  const response = await fetch(`${baseUrl}/guests/${id}`, { method: 'DELETE' });
  const data = await response.json();

  return data;
}
