

import { message} from "antd";

const notiBody = (text, type) => {
    message[type](text)
}

export const poppupNoti = {

    paymentFail: () => {
        notiBody("Payment fail, Please try again","error")
    },

    createTableSuccess: () => {
        notiBody("New table has been created","success")
    },

    addandeditRecordSuccess: () => {
        notiBody("Your new change has been saved","success")
    },

    deleteTableSuccess: () => {
        notiBody("Delete table success","success")
    },

    deleteItemSuccess: () => {
        notiBody("Delete item success","success")
    },

    registerSuccess: () => {
        notiBody("Your new account has been created","success")
    },

    registerFail: () => {
        notiBody("You password and re-type password are not the same","error")
    },

    loginSuccess: () => {
        notiBody("Login success","success")
    },

    loginFail: () => {
        notiBody("Your ID, Username or Password are wrong!","error")
    },
}