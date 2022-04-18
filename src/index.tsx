import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { createHttpClient } from 'mst-gql'
import { RootStore } from './models'
import { getSnapshot } from 'mobx-state-tree'
import { StoreContext } from './models'
// import {getToken} from "./components/Forms/token";


const rootStore = RootStore.create(undefined, {
  gqlHttpClient: createHttpClient(window.location.protocol + "//" + window.location.host + '/graphql/')})

const render = () => {
  ReactDOM.render(
    <StoreContext.Provider value={rootStore}>
        <App />
    </StoreContext.Provider>,
    document.getElementById('root'),
  )
}

window.store = rootStore
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
// Render once
render();

declare global {
    interface Window {
        store: any;
        getSnapshot: any;
        token: any;
        data: any
        toJS: any
    }
}

// window.getSnapshot = getSnapshot;
// window.token = getToken()