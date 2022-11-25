import React from "react";
import c from './Header.module.less'
import {useLocation} from "react-router-dom";
function Header(){
    const location = useLocation()
    console.log(location)
    return(<header className={c.Header}>
        <div>
            <h1 className={c.Header__title}>{location.pathname==='/'? "My Projects" : location.pathname.replace('/','')}</h1>
        </div>
    </header>)
}
export default React.memo(Header)