import React from 'react'
import Snake from './Snake'

import { database } from './firebaseConfig'

const App = () => (
    <Snake
        firebaseDatabase={database}
    />
)

export default App
