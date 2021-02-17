export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  addAllCards() {
    return fetch(this._url,
      { headers: this._headers }
    )
      .then(res => {
        return res.json()})
      .catch(err=>{console.log(err)})
  }
  addCard(data) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
        id: data.id
      })
    })
    .then(res => {
      return res.json()})
    .catch(err=>{console.log(err)})

  }
  removeCard(data) {

    return fetch(`${this._url}${data}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(res => { return res.json() })
    .catch(err=>{console.log(err)})


  }
  
  likeCard(data) {

    return fetch(`${this._url}${data}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(res => { return res.json() })
    .catch(err=>{console.log(err)})
 }
 disLikeCard(data) {
   return fetch(`${this._url}${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(res => { return res.json() })
    .catch(err=>{console.log(err)})

  }
  addProfileInfo() {
    return fetch(this._url,
      { headers: this._headers }
    )
      .then(res => {
        return res.json()
      })
      .catch(err=>{console.log(err)})
  }

  editProfileInfo
    (data) {
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(res => { return res.json() })
    .catch(err=>{console.log(err)})
  }
  editAvatarIcon
    (data) {
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link})
    })
    .then(res => { return res.json() })
    .catch(err=>{console.log(err)})
  }
}



