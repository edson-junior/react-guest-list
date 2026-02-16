import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
  useQuery,
  useMutation,
} from '@tanstack/react-query';
import './App.css';
import { addGuest, deleteGuest, fetchGuests, updateGuest } from './guestsApi';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GuestList />
    </QueryClientProvider>
  );
}

function GuestList() {
  const query = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['guests'],
    queryFn: fetchGuests,
  });

  const addGuestMutation = useMutation({
    mutationFn: (guest) => addGuest(guest),
    onSuccess: () => query.invalidateQueries(['guests']),
  });

  const updateGuestMutation = useMutation({
    mutationFn: (guest) => updateGuest(guest),
    onSuccess: () => query.invalidateQueries(['guests']),
  });

  const deleteGuestMutation = useMutation({
    mutationFn: (id) => deleteGuest(id),
    onSuccess: () => query.invalidateQueries(['guests']),
  });

  function handleSubmit(formData) {
    addGuestMutation.mutate(Object.fromEntries(formData.entries()));
  }

  function handleDeleteGuest(id) {
    deleteGuestMutation.mutate(id);
  }

  function handleAttendingStatus(guest) {
    const updatedGuest = {
      ...guest,
      attending: !guest.attending,
    };

    updateGuestMutation.mutate(updatedGuest);
  }

  return (
    <div className="guest-wrapper">
      <h1>Guest List</h1>
      <form className="guest-form" action={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="first-name">First name</label>
          <input
            id="first-name"
            name="firstName"
            placeholder="e.g John"
            required
            disabled={isLoading}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="last-name">Last name</label>
          <input
            id="last-name"
            name="lastName"
            placeholder="e.g Smith"
            required
            disabled={isLoading}
          />
        </div>
        <button disabled={isLoading}>add guest</button>
      </form>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="guest-list">
          {data.map((guest) => (
            <li
              className="guest-item"
              key={`guest-${guest.id}`}
              data-test-id="guest"
            >
              <div>
                {guest.firstName} {guest.lastName}
              </div>
              <div className="guest-actions">
                <label className="button attending-status-label">
                  <input
                    name="attending-status"
                    aria-label="attending status"
                    type="checkbox"
                    checked={guest.attending}
                    disabled={updateGuestMutation.isPending}
                    onChange={() => handleAttendingStatus(guest)}
                    style={{ marginRight: 8 }}
                  />
                  {guest.attending ? 'attending' : 'not attending'}
                </label>
                <button
                  className="button remove"
                  onClick={() => handleDeleteGuest(guest.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
