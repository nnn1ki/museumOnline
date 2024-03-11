import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import ProductStore from "./store/ProductStore";

export const Context = createContext(null);

ReactDOM.render(
    //создается контекст, котороый булет ответчать за предоставление прав и всего остального на следующих этапах работы
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore(),
        product: new ProductStore(),
    }}>
    <App/>,
    </Context.Provider>,
    document.getElementById('root')
);