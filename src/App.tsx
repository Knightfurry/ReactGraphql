import React from 'react';
import './App.css';
import { gql, useQuery} from "@apollo/client";
import Table from './Table';


//We can define the query we want to execute by wrapping it in the gql template litera.
const response = gql`
{
  search(query: "facebook/react sort:created-asc", type: REPOSITORY, first: 100) {
    repositoryCount
    nodes {
      ... on Repository {
        name
        description
        updatedAt
        createdAt
        stargazerCount,
        forkCount,
        url
      }
    }
  }
}
`;

export default function App() {
  //The useQuery hook is a React hook that shares GraphQL data with UI.
  const { loading, error, data } = useQuery(response);
  // if loading is true then show loading message.
  if (loading) return <p>Loading Data please wait...</p>;
  //if error is true then show error message.
  if (error) return <p>{error.message}</p>
  return (
    <>
    <div>
     {!loading &&
     <Table
      tableData = {data.search.nodes}
      />} 
    </div>
    </>
  );
}
