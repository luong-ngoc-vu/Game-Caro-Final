import React from 'react';
import $ from 'jquery';
import io from 'socket.io-client';
import Input from './input';
import _map from 'lodash/map';
import Messages from './message-list';

import '../App.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [
                {id: 1, userId: 0, message: 'Hello'}
            ],
            user: null,
        }
        this.socket = null;
    }

    componentWillMount() {
        this.socket = io('localhost:6969');
        this.socket.on('id', res => this.setState({user: res})) // lắng nghe event có tên 'id'
        this.socket.on('newMessage', (response) => {
            this.newMessage(response)
        });
    }

    newMessage(m) {
        const messages = this.state.messages;
        const ids = _map(messages, 'id');
        const max = Math.max(...ids);
        messages.push({
            id: max + 1,
            userId: m.id,
            message: m.data
        });

        const objMessage = $('.messages');
        if (objMessage[0].scrollHeight - objMessage[0].scrollTop === objMessage[0].clientHeight) {
            this.setState({messages});
            objMessage.animate({scrollTop: objMessage.prop('scrollHeight')}, 300);

        } else {
            this.setState({messages});
            if (m.id === this.state.user) {
                objMessage.animate({scrollTop: objMessage.prop('scrollHeight')}, 300);
            }
        }
    }

    sendnewMessage(m) {
        if (m.value) {
            this.socket.emit("newMessage", m.value);
            m.value = "";
        }
    }

    render() {
        return (
            <div className="app__content">
                <h1>chat box</h1>
                <div className="chat_window">
                    <Messages user={this.state.user} messages={this.state.messages} typing={this.state.typing}/>
                    <Input sendMessage={this.sendnewMessage.bind(this)}/>
                </div>
            </div>
        )
    }
}
