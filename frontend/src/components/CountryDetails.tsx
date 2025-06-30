import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

export function CountryDetails() {
  const { code } = useParams();
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur 😥</p>;

  const country = data.country;

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-2xl">
            {country.emoji} {country.name}
          </h2>
          <p><strong>Code :</strong> {country.code}</p>
          <p><strong>Continent :</strong> {country.continent?.name || 'Non renseigné'}</p>
        </div>
      </div>
    </div>
  );
}
