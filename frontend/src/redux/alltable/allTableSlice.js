import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  axios  from 'axios';
import { CreateTableUrl, GetAllTableUrl } from '../../services/api';
import {poppupNoti} from '../../util/notification/Notification'

const initialState = {
    tableList: [],
    getTableLoading: false,
    loading: false
};

const headers = {
    aws_access_key_id:"ASIAZ2QU2A74DSCA3FN2",
    aws_secret_access_key:"u/So3k2yLb/hna2QWoawHz1GX92FLm2xfM5Ddr95",
    aws_session_token:"FwoGZXIvYXdzEMX//////////wEaDEsBOL2hemUkhw4HpSLPAQdWCqz8p3FDRjP/DLaeSw4Lhw7RUiYrPVxQlRyRJ4SxRZX36dXNXqkmRdXj9DVNCVpf9ziV8z//MlN7iqrLS4knMzobxqWK95z5kcc5hnbwBqfj1chTNn/kBiiiaBXQ77XraSM5Fw1/v4qy+Dr3fDFY7KEdgDBSWoO0WlZyXwyVcZG8BN08Is+Xop4VSXh1w1ph96fk6I7AvxacfE3JQ4jZ0f4pIIsUPYDNro5HhrQq2Rj2a/FtJfutZPoh0JuYcSa9K7rRhLLAHX7AhS+YEijJnLCcBjItALVeVGwE+BkdbiTHFz/JnMnWVWhdSCXrQAjMTnj93kvzXgU9CR7Jc7n/iqn7"
}

export const createTable = createAsyncThunk('alltable/createtable',
        async (tableData) => {
        const response = await fetch(CreateTableUrl,{
            method: 'POST',
            body: tableData
        })
        return response.json()
    }
)

export const getAllTable = createAsyncThunk('alltable/getallltable',
        async () => {
            const res = await axios.get(GetAllTableUrl)
            return res.data
        }
)

export const allTableSlice = createSlice({
    name: "allTable",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        /////////////Create Table////////////////////////////
        builder.addCase(createTable.pending, (state) => {
            state.loading = true
        })

        builder.addCase(createTable.fulfilled, (state,action) => {
            poppupNoti.createTableSuccess()
            state.loading = false
        })

        builder.addCase(createTable.rejected, (state) => {
            state.loading = false
        })

        ///////////////////////////////////////////////////////
        /////////////Get All Table////////////////////////////
        builder.addCase(getAllTable.pending, (state) => {
            state.getTableLoading = true
        })

        builder.addCase(getAllTable.fulfilled, (state,action) => {
            let newTableList = []
            newTableList = action.payload.map((table,index) => {
                return {
                    tablename: table.tablename,
                    partitionkey: table.AttributeDefinitions[0].AttributeName,
                    partitionkeytype: table.AttributeDefinitions[0].AttributeType,
                    sortkey: table.AttributeDefinitions[0].AttributeName,
                    sortkeytype: table.AttributeDefinitions[0].AttributeType,
                    key: index
                }
            })
            state.tableList = newTableList
            state.getTableLoading = false
        })

        builder.addCase(getAllTable.rejected, (state) => {
            state.getTableLoading = false
        })
    }
})

export const { } = allTableSlice.actions


export default allTableSlice.reducer