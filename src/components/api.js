export default class Api {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
      }

addAllCards (){   
    return fetch (this._url,
    {headers: this._headers}
)
.then (res=>{ 
    return res.json()})}
addCard(data){    
    
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        
name: data.name,
link: data.link,
id: data.id

})}).then (res=>{ return res.json()})
}
/*removeCard(id){
    return fetch(`${this._url}${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then (res=>{ return res.json()})
    return fetch (this._url,
        {headers: this._headers}
  }*/
addProfileInfo(){   
    return fetch (this._url,
    {headers: this._headers}
)
.then (res=>{ console.log(res)
    return res.json()})}

editProfileInfo 
(data){    
    
    return fetch(this._url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      

})}).then (res=>{ return res.json()})
}
/*addNewCard(data){
    return fetch (
        this._url,
        {method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name: data.name,
            about: data.link
          }) })
        .then(res => { return res.json})
}*/

} 
 