import React from "react";

function Login() {
  return (
    <div className="container">
      <form className="form" onSubmit={()=>{}}>
        <h2 className="title">Log In</h2>
        <input
          className="input"
          type="text"
          name="title"
          placeholder="Email"
          // minLength="1"
          // maxLength="30"
          // value={inputValue1 }
          // onChange={onInputChange1}
          required
        />
        <span
          id="popup__title-error"
          className="popup__input_type_error"
        ></span>
        <input
          className="popup__input popup__about"
          type="text"
          name="link"
          // placeholder={inputPlaceholder2}
          // pattern={input2Type === "link"? "https?://.+":null}
          // value={inputValue2  }
          // ref={refInput2}
          // onChange={onInputChange2}
          // required
        />
        <span
          id="popup__link-error"
          className="popup__input_type_error"
        ></span>
        <button type="submit" className="">Log In</button>
       
      </form>
    </div>   
  );
}

export default Login;