import {useEffect, useState} from "react";
import "./App.css";
import socket from "./server";
import InputFieId from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";
function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message));
    });
    askUserName();
  }, []);
  const askUserName = () => {
    const userName = prompt("사용하실 이름을 입력하세요");
    console.log("uuu", userName);

    socket.emit("login", userName, (res) => {
      if (res?.ok) {
        setUser(res.data);
      }
    });
  };
  const sendMessage = (event) => {
    event.preventDefault();
    if (!user) {
      alert("로그인 후 메시지를 보낼 수 있습니다.");
      return;
    }
    socket.emit("sendMessage", message, (res) => {
      console.log("sendMessage res", res);
    });
  };
  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        <InputFieId message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default App;
