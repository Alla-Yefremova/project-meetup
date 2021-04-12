import React from 'react'
import './TravelCard.css'

function TravelCard(props) {
  return (
    <>
      <article>
        <header>
          <span className="date">April 24, 2017</span>
          <h3 className="title-travels">
            <a href="/profile/:id">Sed magna ipsum ipsum ipsum ipsum faucibus</a>
          </h3>
        </header>
        <a href="/profile/:id" className="image fit">
          <img src="pic01.jpg" alt="" />
        </a>
      </article>
      <article>
        <header>
          <span className="date">April 24, 2017</span>
          <h3 className="title-travels">
            <a href="/profile/:id">Sed magna ipsum faucibus</a>
          </h3>
        </header>
        <a href="/profile/:id" className="image fit">
          <img src="pic01.jpg" alt="" />
        </a>
      </article>
      <article>
        <header>
          <span className="date">April 24, 2017</span>
          <h3 className="title-travels">
            <a href="/profile/:id">Sed magna ipsum faucibus</a>
          </h3>
        </header>
        <a href="/profile/:id" className="image fit">
          <img src="pic01.jpg" alt="" />
        </a>
      </article>
    </>
  )
}

export default TravelCard
