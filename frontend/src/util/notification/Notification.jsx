

import { message} from "antd";

const notiBody = (text, type) => {
    message[type](text)
}

export const poppupNoti = {

    paymentFail: () => {
        notiBody("Payment fail, Please try again","error")
    },

    createTableSuccess: () => {
        notiBody("New table have been created","success")
    },

    addAddressSuccess: () => {
        notiBody("A new address have been added","success")
    },

    deleteAddressSuccess: () => {
        notiBody("Delete address success","success")
    }
}