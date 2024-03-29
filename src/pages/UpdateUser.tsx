import React from 'react';
import TextInput from "../components/AddUser/TextInput";
import GenderRadioInput from "../components/AddUser/GenderRadioInput";
import Button from "../components/Button";
import Store from "../services/store.service";
import {Link} from "react-router-dom";
import {changeUser, checkStore} from "./AddUser";
import HttpService from "../services/http.service";

interface IProps {
    history:any
}

interface IState {
    getUpdated: boolean
}



class UpdateUser extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);
        this.updateUser = this.updateUser.bind(this);
        this.navigateToTable=this.navigateToTable.bind(this);
        this.state = {
            getUpdated: false
        }
    }

    checkUpdate() {

    }

    navigateToTable() {
        const {history} = this.props;
        history.push("/");
    }

    updateUser(e:any) {
        e.preventDefault();
        if (checkStore()) {
            HttpService.put(`/user/${Store.user.id}`, {
                name: Store.user.name,
                secondName: Store.user.secondName,
                lastName: Store.user.lastName,
                email: Store.user.email,
                phone: Store.user.phone,
                gender: Store.user.gender,
                address: Store.user.address,
            }).then(() => this.navigateToTable() )
                .catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center m-1 p-3 ">Изменение информации пользователя</h2>
                <form>
                    <div className="form-row">
                        <TextInput name={'Имя'} placeholder={'Введите имя'}
                                   storeName='name'
                                   defaultValue={Store.user.name}
                                   onChange={changeUser}
                        />
                        <TextInput name={'Фамилия'} placeholder={"Введите фамилию"}
                                   storeName='secondName'
                                   onChange={changeUser}
                                   defaultValue={Store.user.secondName}
                        />

                        <TextInput name={'Отчество'} placeholder={"Введите отчество"}
                                   storeName='lastName'
                                   onChange={changeUser}
                                   defaultValue={Store.user.lastName}
                        />
                    </div>
                    <div className="form-row">
                        <TextInput name={'Email'} placeholder={'Введите Email'}
                                   storeName='email'
                                   onChange={changeUser}
                                   defaultValue={Store.user.email}
                        />
                        <TextInput name={'Номер телефона'} placeholder={'Введите номер телефона'}
                                   storeName='phone'
                                   onChange={changeUser}
                                   defaultValue={Store.user.phone}
                        />
                        <GenderRadioInput name={'Пол'}
                                          value1name={'Мужской'}
                                          storeName={'gender'}
                                          value2name={'Женский'}
                                          onChange={changeUser}
                                          checked={Store.user.gender}
                        />
                        <TextInput name={'Страна, город, улица, дом , кв'} placeholder={'Введите адрес'}
                                   storeName='address'
                                   styles={'col-md-12 mb-3'}
                                   onChange={changeUser}
                                   defaultValue={Store.user.address}
                        />
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
                                <Button function={this.updateUser} name={'Сохранить изменения'} styleType={"primary"}
                                        style={"btn-sm p-3"}/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
;

export default UpdateUser;
