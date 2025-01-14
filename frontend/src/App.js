import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";

import HeroesIndex from "./components/HeroesIndex";
import CreateHeroForm from "./components/CreateHeroForm";
import Layout from "./components/Layout";
import Home from "./components/Home";
import BattlesIndex from "./components/BattlesIndex";
import NewBattle from "./components/BattlesIndex/NewBattle";
import BattleField from "./components/BattleField";
import Chat from "./components/Chat";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return ( 
    <>
      {isLoaded && (
        <Switch>
          <Layout isLoaded={isLoaded}>
            <Route exact path='/heroes/create' component={CreateHeroForm}/>
            <Route exact path='/heroes' component={HeroesIndex}/>
            <Route exact path = '/battles/new' component={NewBattle}/>
            <Route expact path = '/battles/fight/:battleId' component={BattleField}/>
            <Route exact path='/battles' component={BattlesIndex}/>
            <Route exact path='/chat' component={Chat}/>
            <Route exact path='/' component={Home}/>
          </Layout>
        </Switch>
      )}
    </>
  );
}

export default App;
