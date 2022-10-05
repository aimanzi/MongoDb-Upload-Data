import { useState } from "react";
import sha256 from "crypto-js";
import React from "react";
import "./apipost.css";

function LoginEncryption() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [mailmessage, setMailMessage] = useState("");
  const [passwordmessage, setPasswordMessage] = useState("");

  const validations = () => {
    let passStatus = [];
    let mailstatus;

    //mail validation
    const Emailregex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (Emailregex.test(mail)) {
      mailstatus = true;
      setMailMessage("Vaild Mail Address");
    } else {
      mailstatus = false;
      setMailMessage("Invaild Mail Address");
    }

    //password validation
    const length = password.length >= 8;
    if (length) {
      passStatus.push(true);
    } else {
      passStatus.push("password leght is wrong");
    }
    const numbers = password.match(/[0-9]/);
    if (numbers) {
      passStatus.push(true);
    } else {
      passStatus.push("number Condition missing in the password");
    }
    const uppercase = password.match(/[A-Z]/);
    if (uppercase) {
      passStatus.push(true);
    } else {
      passStatus.push("UperCase Condition is Missing");
    }
    const lowercase = password.match(/[a-z]/);
    if (lowercase) {
      passStatus.push(true);
    } else {
      passStatus.push("LowerCase Condition is Missing");
    }
    const english = password.match(
      /^[a(/^[a-zA-Z0-9\\!\@\#\$\%\^\&\*\?\>\<\,\.\/\;\:\'\"\|\+\=\-\_\;]/
    );
    if (english) {
      passStatus.push(true);
    } else {
      passStatus.push("English Condition is Missing");
    }
    const special_chara = password.match(
      /[`\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\,\.\/\'\]\[\<\>\?\"\:\ ]/
    );
    if (special_chara) {
      passStatus.push(true);
    } else {
      passStatus.push("Special Character Condition is Missing");
    }
    const passing = passStatus.every((a) => a === true);
    if (passing) {
      setPasswordMessage("Valid Password");
    } else {
      setPasswordMessage("Invalid Password");
    }

    if (passing === true && mailstatus === true) {
      postData();
    }
  };

  const postData = () => {
    const postobj = {
      mail: sha256.SHA256(mail),
      password: sha256.SHA256(password),
    };
    // alert(postobj.mail);
    // alert(postobj.password);

    const init_data = {
      method: "POST",
      headers: {
        "Access-Control": "Allow-Origin, " * "",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postobj),
    };
    fetch("http://localhost:5000/data", init_data)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form>
        <div style={{ marginTop: "30px", marginLeft: "20px" }}>
          <div style={{ marginTop: "10px" }}>
            <label style={{ marginRight: "35px" }}>Mail : </label>
            <input type={"email"} onChange={(e) => setMail(e.target.value)} />
          </div>
          <div style={{ marginTop: "10px" }}>
            <label>Password : </label>
            <input
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={validations}
              style={{ marginTop: "20px", marginLeft: "30px" }}
            >
              Send To Encryption
            </button>
          </div>
        </div>
      </form>
      <div style={{ marginTop: "20px" }}>
        <div>
          <label>{mailmessage}</label>
        </div>
        <div>
          <label>{passwordmessage}</label>
        </div>
      </div>
    </div>
  );
}

export default LoginEncryption;
