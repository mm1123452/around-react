class Auth {
    constructor({baseUrl,headers}) {
      this.baseUrl = baseUrl;
      this.headers = headers
    }

    register(email, password)  {
      return fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({email, password})
      })
      .then((response) => {
        try {
          if (response.status === 200){
            return response.json();
          }
        } catch(e){
            return (e)
        }
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
    }; 

    signin(email, password){
      return fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({email, password})
      })
      .then((response) => {
        try {
          if (response.status === 200){
            return response.json();
          }
        } catch(e){
            return (e)
        }
      })
      .then((res) => {
        //console.log('token',res)
        if (res.token) {
          localStorage.setItem('token', res.token);
          return res;
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
    }; 

    getContent(token){
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: {...this.headers, "Authorization" : `Bearer ${token}`} 
        
      })
      .then((response) => {
        try {
          if (response.status === 200){
            return response.json();
          }
        } catch(e){
            return (e)
        }
      })
      .then((res) => {
          return res;     
      })
      .catch((err) => console.log(err));
    }; 
  }

  export const auth = new Auth({
    baseUrl: "https://register.nomoreparties.co",
    headers: {
      "Content-Type": "application/json",
      "Accept":"application/json"
    }
  });
  