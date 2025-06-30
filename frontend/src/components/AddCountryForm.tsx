import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const ADD_COUNTRY = gql`
  mutation AddCountry($input: AddCountryInput!) {
    addCountry(input: $input) {
      code
      name
      emoji
    }
  }
`;

export function AddCountryForm() {
  const [form, setForm] = useState({ name: '', code: '', emoji: '' });
  const [addCountry, { loading, error }] = useMutation(ADD_COUNTRY, {
    update(cache, { data: { addCountry } }) {
      cache.modify({
        fields: {
          countries(existing = []) {
            return [...existing, addCountry];
          },
        },
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addCountry({ variables: { input: form } });
    setForm({ name: '', code: '', emoji: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input className="input input-bordered w-full" placeholder="Nom du pays" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <input className="input input-bordered w-full" placeholder="Code (ex: FR)" value={form.code}
        onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} />
      <input className="input input-bordered w-full" placeholder="Emoji (🇫🇷)" value={form.emoji}
        onChange={e => setForm({ ...form, emoji: e.target.value })} />
      <button className="btn btn-primary w-full" disabled={loading}>Ajouter</button>
      {error && <p className="text-error">Erreur : {error.message}</p>}
    </form>
  );
}
