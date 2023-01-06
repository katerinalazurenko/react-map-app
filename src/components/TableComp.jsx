import React from 'react';
import { Table } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {getSelectedRow, getTableData} from '../store/selectors';
import {selectRoute} from "../store/reducers/TableSlice";
import {buildRouteAction} from "../store/reducers/MapSlice";
import {useEffect} from "react";

const columns = [
    {
        title: 'Номер заявки',
        dataIndex: 'requestNumber',
    },
    {
        title: 'Координаты ОТ lat',
        dataIndex: 'fromLat',
    },
    {
        title: 'Координаты ОТ Lng',
        dataIndex: 'fromLng',
    },
    {
        title: 'Координаты ДО lat',
        dataIndex: 'toLat',
    },
    {
        title: 'Координаты ДО Lng',
        dataIndex: 'toLng',
    },
];

export const TableComp = () => {
    const dispatch = useDispatch()
    const data = useSelector(getTableData);
    const selectedRow = useSelector(getSelectedRow);

    useEffect(() => {
        if(selectedRow){
            const coordinates = `${selectedRow.fromLng},${selectedRow.fromLat};${selectedRow.toLng},${selectedRow.toLat}`
            dispatch(buildRouteAction(coordinates))
        }
    },[selectedRow, dispatch])

    const selectRow = (record) => {
        dispatch(selectRoute(record))
    }

    const setRowClassName = (record) => {
        if(selectedRow){
            return record.key === selectedRow.key ? 'selected' : '';
        }
    }

    return (
        <div className='Table'>
            <Table
                rowClassName={setRowClassName}
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                onRow={(record) => ({
                    onClick: () => {
                        selectRow(record);
                    },
                })}
            />
        </div>)

};
