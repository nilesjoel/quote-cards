import React, { useRef, useState, useEffect, useCallback } from 'react'
import { render } from 'react-dom'
import { useTransition, animated } from 'react-spring'
import './styles.css'

const color1 = '#D789D9'
const color2 = '#CB62D9'
const color3 = '#03178C'
const color4 = '#0420BF'

function App() {
  const ref = useRef([])
  const [items, set] = useState([])
  const transitions = useTransition(items, null, {
    from: {
      opacity: 50,
      height: 0,
      innerHeight: 0,
      transform: 'perspective(600px) rotateX(0deg)',
      color: color1,
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: 'perspective(600px) rotateX(180deg)', color: color4 },
      { transform: 'perspective(600px) rotateX(360deg)', color: '#FFF' },
    ],
    leave: [{ color: color2 }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { color: color3 },
  })

  const quoteOne = {
    segments: [
      { words: ['Only', 'knowing'], duration: 2000 },
      { words: ['Is', 'known'], duration: 6000 },
      { words: ['Only', 'knowing', 'Is', 'known'], duration: 8000 },
    ],
  }

  const quoteThree = {
    segments: [
      { words: ['We', 'can not', 'become...'], duration: 1000 },
      { words: ['What', 'we', 'already', 'are'], duration: 5000 },
      { words: ['We', 'can not', 'be'], duration: 8000 },
      { words: ['What', 'we', 'are', 'not'], duration: 12000 },
    ],
  }
  const quoteFour = {
    segments: [
      { words: ['How', 'we', 'see'], duration: 1000 },
      { words: ['Is', 'what', 'we', 'see'], duration: 5000 },
    ],
  }
  // const quoteFive = {
  //   segments: [
  //     { words: ['Check', 'yourself'], duration: 1000 },
  //     { words: ['Before', 'you', 'reflect'], duration: 5000 },
  //     { words: ['Check', 'yourself', 'Before', 'you', 'reflect', 'yourself'], duration: 5000 },
  //   ],
  // }

  const quotes = [quoteOne, quoteThree, quoteFour]
  let currentIndex = 0
  const reset = useCallback(() => {
    ref.current.map(clearTimeout)
    ref.current = []
    set([])

    if (currentIndex > quotes.length - 1) {
      currentIndex = 0
    }
    // setCount(currentIndex)
    console.log('currentIndex', currentIndex)
    let definedQuote = quotes[currentIndex++]
    let quoteSegments = definedQuote['segments']
    for (let i = 0; i < quoteSegments.length; i++) {
      let words = quoteSegments[i].words
      let duration = quoteSegments[i].duration
      console.log(words, duration)
      ref.current.push(setTimeout(() => set(words), duration))
    }

    // ref.current.push(setTimeout(() =>

    // ref.current.push(setTimeout(() => set(['Only', 'knowing', 'Is', 'known']), 8000))

    // ref.current.push(setTimeout(() => set(['We', 'can not', 'become...', 'what', 'we', 'already', 'are.']), 1000))
    // ref.current.push(setTimeout(() => set(['We', 'can not', 'be,', 'what', 'we', 'are', 'not.']), 12000))

    // ref.current.push(setTimeout(() => set(['We', 'can not', 'become...']), 1000))
    // ref.current.push(setTimeout(() => set(['What', 'we', 'already', 'are']), 5000))
    // ref.current.push(setTimeout(() => set(['We', 'can not', 'be']), 8000))
    // ref.current.push(setTimeout(() => set(['What', 'we', 'are', 'not']), 12000))
  }, [])

  useEffect(() => void reset(), [reset])

  return (
    <div>
      {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
        <animated.div className="transitions-item" key={key} style={rest} onClick={reset}>
          <animated.div style={{ overflow: 'hidden', height: innerHeight }}>{item}</animated.div>
        </animated.div>
      ))}
    </div>
  )
}

render(<App />, document.getElementById('root'))
