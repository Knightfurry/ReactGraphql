import React from 'react';
import './App.css';
import { useQuery} from "@apollo/client";
import Table from './Table';
import {responseGql} from '../src/_helper/Ggl';


export default function App() {
  const response = responseGql(60);
  console.log('TEST', process.env.REACT_APP_API_KEY_SAMPLE);
  //The useQuery hook is a React hook that shares GraphQL data with UI.
  const { loading, error, data } = useQuery(response);
  // if loading is true then show loading message.
  if (loading) return <p>Loading Data please wait...</p>;
  //if error is true then show error message.
  if (error) return <p>{error.message}</p>
  return (
    <>
    <div className='container'>
     {!loading &&
     <Table
      tableData = {data.search.nodes}
      />} 
    </div>
    </>
  );
}

