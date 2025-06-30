import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_COUNTRIES } from '../api/example';

export function CountryList() {
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur 😥</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.countries.map((country: any) => (
        <Link to={`/country/${country.code}`} key={country.code} className="card shadow-md bg-base-100 hover:shadow-xl transition">
          <div className="card-body">
            <h2 className="card-title text-lg">
              {country.emoji} {country.name}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

