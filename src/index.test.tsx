import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from '@apollo/client';
import App from "./App";
export const responseGql = (val=100) => {
    return gql`
    {
      search(query: "facebook/react sort:created-asc", type: REPOSITORY, first: ${val}) {
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
    }`;
}
const mocks:any = [
    {
        request: {
          query: responseGql,
        },
        result: {
          data: { 
            search:{
                "node":[{ 'name': 'react', 'forkCount': 1, 'stargazerCount': 3 }]
            },
        },
      }
}]; 
it("renders without error", () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} >
      <App  />
    </MockedProvider>
  );

  const tree:any|null = component.toJSON();
  expect(tree.children).toContain("Loading...");
});