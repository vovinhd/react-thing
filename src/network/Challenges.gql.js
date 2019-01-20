import gql from 'graphql-tag'

export const CURRENT_CHALLENGES = gql`
    query currentChallenges {
        currentChallenges {
            id,
            plan {
                themenwoche {
                    title
                }
            },
            challenge {
                id,
                title,
                content
            }
        }
    }
`;