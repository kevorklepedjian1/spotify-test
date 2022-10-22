
import {useState, useEffect} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row , Card , Button , FormControl, InputGroup,  } from 'react-bootstrap'
import a from "../a.png"
import styles from './styles.module.css'
import stars from "../star.svg"


function Search() {

  const CLIENT_ID= "6506fd984fd4478bae7ad36d13f91224"
  const REDIRECT_URI="http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  
  const [tokenkey , setTokenkey]= useState("")
  const [searchKey, setSearchKey] = useState("")
  const [searchXKey, setXSearchKey] = useState("")
  
 
  const [artists, setArtists] = useState([])
  const [pagestate, setPagestate] = useState("0")
  const [art, setArt] = useState([])
  const [artt, setArtt] = useState([])
 
 
console.log(RESPONSE_TYPE)
//https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4?si=nnTPyxwiSjyecbsPrHyJYA
  useEffect(() => {


    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    // hashing and getting the token so that the user can acces uponsuccesfull login
    


    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setTokenkey(token)

}, [])
// const  search = async(e) =>{
//   e.preventDefault()
//   const {data} = await axios.get("https://api.spotify.com/v1/search", {
//       headers: {
//           Authorization: `Bearer ${tokenkey}`
//       },
//       params: {
//           q: searchKey,
//           type: "artist"
//       }
//   })

//   setArtists(data.artists.items)
//   //get params
//   // const artistParams = {
//   //   method: 'GET',
//   //   headers : {
//   //     'Content-Type': 'application/json' ,
//   //     'Authorization' : `Bearer  ${tokenkey}`
//   //   }
//   // }
// //   const rtisto= await fetch('https://api.spotify.com/v1/search?q=' + searchKey + '&type=artist',+ artistParams )
// //   .then(response => response.json())
// //   .then(data => {console.log(data)})
// //  }
// }
const search = async (e) => {
  e.preventDefault()
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
          Authorization: `Bearer ${tokenkey}`
      },
      params: {
          q: searchKey,
          type: "artist"
      }
  })

  setArtists(data.artists.items);
  
  
}
const albumleo = async (e, artistSearchKey) => {
  e.preventDefault()
  setXSearchKey(artistSearchKey);
  const {data} = await axios.get(`https://api.spotify.com/v1/artists/${searchXKey}/albums`, {
      headers: {
          Authorization: `Bearer ${tokenkey}`
      }
    

  })
  setArtt(data.items[0].artists[0].name)
  setPagestate("1")
  setArt(data.items)
  
  // setArtists(data.artists.items);

  
}


const renderxArtists = () => {
  return artists.map(artist  => (
    
    <div key={artist.id} >
      <Card value={artist.id} className="kk">
                {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt="" className='do'/> : <div>No Image</div>}
              
           <a onClick={(e) => albumleo(e, artist.id,) }  className="h1">{artist.name}</a>
           {(artist.popularity >80)?
           <div>
          <img src={stars} className="kl"/>
          <img src={stars} className="kl"/>
          <img src={stars} className="kl"/>
          <img src={stars} className="kl"/>
          <img src={stars} className="kl"/></div>
            :
            (artist.popularity >50)
            ?
            <div>
            <img src={stars} className="kl"/>
          <img src={stars} className="kl"/>
          <img src={stars} className="kl"/>
          </div>
          :
          (artist.popularity>30)
          ?
<div>
            <img src={stars} className="kl"/>
          <img src={stars} className="kl"/>
          
          </div>
          :
          <div>
            <img src={stars} className="kl"/>
        
          
          </div>
           }
           <p className='h6'>{artist.followers.total} followers</p>  
          
                </Card>
            </div>
   
      
     
         
          
      
      
  ));
}

console.log(art)
const renderArtists = () => {
  return art.map((arts)  => (
    
    <div key={arts.id} >
      
     <Card className="kk">
      
      
                {arts.images.length ? <img width={"100%"} src={arts.images[0].url} alt=""className="do"/ > : <div>No Image</div>}
          <p>{arts.name} </p>   
          <p>{arts.artists[0].name}</p> 
         <p> {arts.release_date}</p>
        <p>tracks {arts.total_tracks}</p>
           <button ><a href={arts.external_urls.spotify}>Preview on spotify</a></button>
                
           
   </Card>
      
      </div>
         
          
      
      
  ));
}
console.log(artists);
  return (
    <div className="App">
      <header className="App-header">

       
       {!tokenkey ?

<div className={styles.login_container}>
      
<div className={styles.login_form_container}>
  <div className={styles.left}>
  <Button className={styles.green_btn1}> <a className='text-white' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login</a><img src={a} className="k"/></Button>
    
   
  </div>
  
           
</div>

</div>
      //  <div className="d-flex justify-content-center  mt-2">
        
      //    <Button > <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login</a></Button>
      
      
      // </div>
       
     
      :
      <div>
         <Container>
       

         <form onSubmit={search} className="d-flex">
                        <input type="text" onChange={e => setSearchKey(e.target.value)}class="form-control" />
                      <button type={"submit"} class="btn btn-primary">Search</button>
                    </form>
          {/* <InputGroup className='mb-3' size='lg'>
            
          <FormControl 
          onSubmit={search}
          type="input"
          placeholder="search for artist"
          onKeyPress={event =>{
            if(event.key === "Enter"){
              search()
            }
          }}
           onChange={event => setSearchKey(event.target.value)}
           
          />
          <Button >Search</Button>

         
          </InputGroup> */}
         </Container>
         <Container>
       
{(pagestate === "0")?<Row className='kk mx-2 row  row-cols-4'>{renderxArtists()}</Row>:<div>  <h1 >{artt} </h1><h2>Albums</h2>  <Row className='kk mx-2 row  row-cols-4'>{renderArtists()}</Row> </div> }
         
            
         </Container>
                 </div>
      }
        
                    

                  
                

                
      </header>
    </div>
  );
}

export default Search;
