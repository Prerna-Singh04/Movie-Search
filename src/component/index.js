import React from 'react'
import { MovieSearchBar } from './movie-search'
import { MovieSearchHeader } from './common-component/header'

export const MovieSeach = () => {
  return (
    <div>
        <MovieSearchHeader />
        <MovieSearchBar />
    </div>
  )
}
