import React from 'react'
import Home from './pages/Home';
import { useCharacter } from './utils/hooks/useCharacter';
import { CharacterContext } from './utils/contexts/CharacterContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CharacterDetail from './pages/ChracterDetail';

const App = () => {
  const { useCharacterMemo, state } = useCharacter();

  return (
    
    <CharacterContext.Provider value={{ state: state, useCharacterMemo: useCharacterMemo }} >
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/CharacterDetail/:id">
            <CharacterDetail />
          </Route>
        </Switch>    
      </Router>
    </CharacterContext.Provider>
  )
}

export default App;
