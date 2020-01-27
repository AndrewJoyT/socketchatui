import React from 'react';
import axios from 'axios';
import io from 'socket.io-client'
import './App.css'

function App (){
  const [messages,setmessages]=React.useState([])
  const [userCount,setuserCount]=React.useState(0)
  const [inputdata,setinputdata]=React.useState({
    nama:React.useRef(),
    message:React.useRef()
  })

  React.useEffect (()=>{
  const socket = io('http://localhost:1997/');  
  socket.on('chat message', updateMessages);
  socket.on('user connected', updateUserCount);
  axios.get('http://localhost:1997/chat/getmessages')
    .then((res) =>{
      setmessages(res.data)
    })
  },[])
  
  const updateMessages = (msgs) => {
    setmessages(msgs)
  }

  const updateUserCount = (count) => {
    setuserCount(count)
  }

  const onBtnSendClick = () => {
    axios.post('http://localhost:1997/chat/sendmessages',{
      nama:inputdata.nama.current.value,
      message: inputdata.message.current.value
    }).then((res)=>{
      console.log(res.data)
    })
  }

  const onBtnClearClick = () => {
    axios.delete('http://localhost:1997/chat/clearmessages')
    .then((res)=>{
      console.log(res.data)
    })
  }

  const renderListMessage = () => {
    return messages.map((item, index)=>{
      return (
        <tr key={index}>
          <td>{item.nama}</td>
          <td>{item.message}</td>
          <td></td>
        </tr>
      )
    })
  }

  return (
    <center>
      <h2>
        Chat Group (User Connected : {userCount})</h2>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Messages</th>
              <th><input type="button" value="Clear" onClick={onBtnClearClick} /></th>
            </tr>
          </thead>
          <tbody>
            {renderListMessage()}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <input type="text" ref={inputdata.nama} />
              </td>
              <td>
                <input type="text" ref={inputdata.message} />
              </td>
              <td>
                <input type="button" value="send" onClick={onBtnSendClick} />
              </td>
            </tr>
          </tfoot>
        </table>
    </center>
  );
}

export default App;