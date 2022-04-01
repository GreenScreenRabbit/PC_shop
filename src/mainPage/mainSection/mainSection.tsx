import { connect } from 'react-redux'
import "./mainSection.css"


const MainSection = () => {
return(
  <>
    <div className="mainSection-body">
           <div className="mainSection-header"></div>
            <div className="mainSection-box"></div>
            <div className="mainSection-box"></div>
            <div className="mainSection-box"></div>
            <div className="mainSection-box"></div>
    </div>
  </>
  )
}


export default connect(null,null)(MainSection)