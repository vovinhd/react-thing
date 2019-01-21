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

export const CURRENT_SEASON = gql`
    query currentSeason {
        currentSeason {
            id,
            startDate,
            startOffsetDate,
            endDate,
            title
        }
    }
`;

export const CURRENT_SEASONPLAN = gql`
    query globalCurrentChallenges {
        globalCurrentChallenges {
            themenwoche {
                title
                content
                headerImage {url}
                createdAt
                updatedAt
                kategorie {name}
            }
        }
    }
`;

export const COMPLETE_CHALLENGE = gql`
    mutation completeChallenge($challengeId: Int!) {
        completeChallenge(challengeId:$challengeId) {
            id
        }
    }
`;


export const REJECT_CHALLENGE = gql`
    mutation rejectChallenge($challengeId: Int!) {
        rejectChallenge(challengeId:$challengeId) {
            id
        }
    }
`;

