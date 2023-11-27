import React from 'react'

function Item ({task, url,deleteTask}) {
  return (
    <article>
          <h4>{task}</h4>
          <img src={url}/>
          <br/>
          <button className="deletebutton" onClick={deleteTask}>Delete</button>
        </article>
  )
}

export default Item