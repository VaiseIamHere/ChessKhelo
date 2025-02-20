import { Status } from '../../constants'
import { useAppContext } from '../../contexts/Context'
import { closePopup } from '../../reducers/actions/popup'
import './Popup.css'
import PromotionBox from './PromotionBox/PromotionBox'

const Popup = () => {

    const { appState, dispatch } = useAppContext()

    const onClosePopup = () => {
        dispatch(closePopup())
    }
    if(appState.status === Status.ongoing)  return null
    else{
        return <div className='popup'>
            <PromotionBox onClosePopup={onClosePopup}/>
        </div>
    }
}

export default Popup