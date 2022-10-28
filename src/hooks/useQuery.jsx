import { useQuery } from '@apollo/client';
import { useState } from 'react';

const useQueryActions = ({ gql, params }) => {
	const [response, setResponse] = useState([]);
	const { data, loading, error } = useQuery(gql, {
		variables: { ...params },
	});

  return {
    data, 
    loading,
    error
  }
};
