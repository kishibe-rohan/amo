import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {useAlert} from 'react-alert'
import { LockOpen,Lock,VpnKey } from '@material-ui/icons'

import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import { clearErrors,updatePassword } from '../../actions/userAction'

import Loading from '../layout/Loading'
import MetaData from '../layout/MetaData'
import Header from '../layout/Header/Header'
import Footer from '../layout/Footer/Footer'

const UpdatePassword = ({history}) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error,isUpdated,loading} = useSelector((state) => state.profile)

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword",oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm))
    }

    useEffect(() => {
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());

            if(isUpdated)
            {
                alert.success("Password Updated Successfully");
                history.push("/account")
                dispatch({
                    type: UPDATE_PASSWORD_RESET,
                  });
            }
        }
    },[dispatch, error, alert, history, isUpdated])


  return (
    <div>
      Update PW
    </div>
  )
}

export default UpdatePassword
