import React from 'react';
import {Link} from "react-router-dom";

import TextInput from "../components/AddUser/TextInput";
import GenderRadioInput from "../components/AddUser/GenderRadioInput";
import Button from "../components/Button";

import {addUser, changeUser, checkStore, cleanStore} from '../services/store.service'


interface IProps {
    history: any
}

const AddUser: React.FC<IProps> = (props: IProps) => {
    function navigateToUser() {
        const {history} = props;
        history.push("/user");
    }

    function cleanStorePage() {
        cleanStore()
    }

    function changeUserPage(param: string, value: any) {
        changeUser(param, value)
    }

    function addUserPage() {
        if (checkStore()) {
            addUser().then(() => navigateToUser());
        }
    }

    return (
        <div className="container">
            {cleanStorePage()}
            <h2 className="text-center m-1 p-3 ">Создание нового пользователя</h2>
            <form>
                <div className="form-row">
                    <TextInput name={'Имя'} placeholder={'Введите имя'}
                               storeName='name'
                               onChange={changeUserPage}/>
                    <TextInput name={'Фамилия'} placeholder={"Введите фамилию"}
                               storeName='secondName'
                               onChange={changeUserPage}/>
                    <TextInput name={'Отчество'} placeholder={"Введите отчество"}
                               storeName='lastName'
                               onChange={changeUserPage}/>
                </div>
                <div className="form-row">
                    <TextInput name={'Email'} placeholder={'Введите Email'}
                               storeName='email'
                               onChange={changeUserPage}/>
                    <TextInput name={'Номер телефона'} placeholder={'Введите номер телефона'}
                               storeName='phone'
                               onChange={changeUserPage}/>
                    <GenderRadioInput name={'Пол'}
                                      value1name={'Мужской'}
                                      storeName={'gender'}
                                      value2name={'Женский'}
                                      onChange={changeUserPage}/>
                    <TextInput name={'Страна, город, улица, дом , кв'} placeholder={'Введите адрес'}
                               storeName='address'
                               styles={'col-md-12 mb-3'}
                               onChange={changeUserPage}/>
                </div>
                <div className="form-group">
                </div>
                <div className="form-row mb-3 ">
                    <div className=" mr-auto  ">
                        <Link to='/'>
                            <Button name={'Отмена'} styleType={'warning'} style={"btn-sm p-3"}/>
                        </Link>
                    </div>
                    <div>
                        <div>
                            <Button name={'Добавить пользователя'} styleType={"primary"}
                                    function={addUserPage} style={"btn-sm p-3"}/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default AddUser;
