import React from 'react';
import Main from 'components/main';
import io from 'socket.io-client';

React.render(<Main />, document.getElementById('content'));

// var socket = io.connect('http://localhost:7000');
// socket.on('news', function (data) {
//   console.log(data);
//   socket.emit('event', { my: 'data' });
// });