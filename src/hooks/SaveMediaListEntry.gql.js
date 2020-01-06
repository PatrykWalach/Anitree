import gql from 'graphql-tag'

export const SaveMediaListEntryMutation = gql`
  mutation SaveMediaListEntryMutation(
    $id: Int
    $mediaId: Int
    $status: MediaListStatus
    $score: Float
    $scoreRaw: Int
    $progress: Int
    $progressVolumes: Int
    $repeat: Int
    $private: Boolean
    $notes: String
    $advancedScores: [Float]
    $startedAt: FuzzyDateInput
    $completedAt: FuzzyDateInput
  ) {
    SaveMediaListEntry(
      id: $id
      mediaId: $mediaId
      status: $status
      score: $score
      scoreRaw: $scoreRaw
      progress: $progress
      progressVolumes: $progressVolumes
      repeat: $repeat
      private: $private
      notes: $notes
      advancedScores: $advancedScores
      startedAt: $startedAt
      completedAt: $completedAt
    ) {
      id
      mediaId
      status
      score
      progress
      progressVolumes
      repeat
      private
      notes
      advancedScores
      startedAt {
        day
        month
        year
      }
      completedAt {
        day
        month
        year
      }
    }
  }
`

export const SaveMediaListEntryQuery = gql`
  query SaveMediaListEntryQuery($id: Int) {
    Media(id: $id) {
      id
      mediaListEntry {
        id
      }
    }
  }
`
