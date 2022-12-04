

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
    }
}