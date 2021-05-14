import { render } from 'react-dom'
import { App } from './App'

{/* Isso aqui é faz a mágica de "renderizar" o js do React pra arquivo de browser. */ }
render(<App />, document.getElementById("root"));