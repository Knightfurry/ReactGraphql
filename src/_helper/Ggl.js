import { gql} from "@apollo/client";
//We can define the query we want to execute by wrapping it in the gql template litera.
export const responseGql = (val) => {
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
