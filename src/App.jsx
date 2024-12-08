import { useState } from 'react'
import Settings from './components/Settings'
import Keys from './components/Keys'
import './styles.css'

export default function App() {
  const [currentInstrument, setCurrentInstrument] = useState('piano')
  const [playbackRate, setPlaybackRate] = useState(10)
  const [volume, setVolume] = useState(50)
  const [loop, setLoop] = useState(false)
  const [loopingNotes, setLoopingNotes] = useState([])
  const [showKeys, setShowKeys] = useState({
    musicKeys: false,
    computerKeys: false,
    noKeys: true,
  })

  const [synthKeys, setSynthKeys] = useState([
    { keyName: 'c2', displayName: 'c2', computerKey: 'a', color: 'white', active: false, keyPressed: false },
    { keyName: 'c-sharp', displayName: 'c#', computerKey: 'w', color: 'black', active: false, keyPressed: false },
    { keyName: 'd', displayName: 'd', computerKey: 's', color: 'white', active: false, keyPressed: false },
    { keyName: 'd-sharp', displayName: 'd#', computerKey: 'e', color: 'black', active: false, keyPressed: false },
    { keyName: 'e', displayName: 'e', computerKey: 'd', color: 'white', active: false, keyPressed: false },
    { keyName: 'f', displayName: 'f', computerKey: 'f', color: 'white', active: false, keyPressed: false },
    { keyName: 'f-sharp', displayName: 'f#', computerKey: 't', color: 'black', active: false, keyPressed: false },
    { keyName: 'g', displayName: 'g', computerKey: 'g', color: 'white', active: false, keyPressed: false },
    { keyName: 'g-sharp', displayName: 'g#', computerKey: 'y', color: 'black', active: false, keyPressed: false },
    { keyName: 'a', displayName: 'a', computerKey: 'h', color: 'white', active: false, keyPressed: false },
    { keyName: 'a-sharp', displayName: 'a#', computerKey: 'u', color: 'black', active: false, keyPressed: false },
    { keyName: 'b', displayName: 'b', computerKey: 'j', color: 'white', active: false, keyPressed: false },
    { keyName: 'c3', displayName: 'c3', computerKey: 'k', color: 'white', active: false, keyPressed: false },
  ])

  const activeKey = synthKeys.find((key) => key.active)

  if (activeKey) {
    playNote(`./sounds/${currentInstrument}/${activeKey.keyName}.mp3`)
    setSynthKeys((prevKeys) =>
      prevKeys.map((key) =>
        key === activeKey ? { ...key, active: false } : key
      )
    )
  }

  function playNote(note) {
    let audio = new Audio(note)
    audio.volume = volume / 100
    audio.playbackRate =
      playbackRate <= 10 ? playbackRate / 10 : playbackRate - 9
    audio.loop = loop
    audio.play()
    loop && setLoopingNotes([...loopingNotes, audio])
  }

  const handleMouseDown = (keyName) => {
    setSynthKeys((prevKeys) =>
      prevKeys.map((key) =>
        key.keyName === keyName
          ? { ...key, active: true }
          : key
      )
    )
  }

  const handleMouseUp = (keyName) => {
    setSynthKeys((prevKeys) =>
      prevKeys.map((key) =>
        key.keyName === keyName
          ? { ...key, active: false }
          : key
      )
    )
  }

  const handleKeyDown = (e) => {
    const keyName = synthKeys.find((key) => key.computerKey === e.key)?.keyName
    if (keyName) {
      setSynthKeys((prevKeys) =>
        prevKeys.map((key) =>
          key.keyName === keyName
            ? { ...key, active: true, keyPressed: true }
            : key
        )
      )
    }
  }

  const handleKeyUp = (e) => {
    const keyName = synthKeys.find((key) => key.computerKey === e.key)?.keyName
    if (keyName) {
      setSynthKeys((prevKeys) =>
        prevKeys.map((key) =>
          key.keyName === keyName
            ? { ...key, keyPressed: false }
            : key
        )
      )
    }
  }

  const propsBundle = {
    currentInstrument,
    setCurrentInstrument,
    playbackRate,
    setPlaybackRate,
    volume,
    setVolume,
    loop,
    setLoop,
    loopingNotes,
    setLoopingNotes,
    showKeys,
    setShowKeys,
  }

  return (
    <div className='wrapper' onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0}>
      <div className='main-container'>
        <Settings {...propsBundle} />

        <Keys
          showKeys={showKeys}
          synthKeys={synthKeys}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
        />
      </div>
    </div>
  )
}
