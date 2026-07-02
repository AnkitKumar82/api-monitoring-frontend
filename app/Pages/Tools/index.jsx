import * as React from 'react'
import Main from './Main'
import NavBar from '../../Commons/NavBar'

function Tools (props) {
  return (
    <>
      <NavBar />
      <Main tool={props.tool} />
    </>
  )
}

export default Tools