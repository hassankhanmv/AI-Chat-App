import React from 'react'
import SuggestionsCards from './SuggestionsCards'
import constants from '../../../constants'

export default function SuggestionsList({setSelectSuggestion}) {
  const suggestionsData = constants.suggestionCards
  return (
    <div>
      <SuggestionsCards
        suggestionsData={suggestionsData}
        setSelectSuggestion={setSelectSuggestion}
      />
    </div>
  )
}
