const assert = require('assert');
require('jsdom-global')()

let beers = [];

// window.onload = () => {
//     getBeers(window.fetch);
    
// }

const getBeer = (fetch, id) => {
    fetch('https://api.punkapi.com/v2/beers/' + id)
    .then(res => {
        if(!res.ok) {
          throw Error(res.statusText)
        } return res.json()
      })
    .then(data => { beers.push(data);
        console.log(beers);
        displayBeer();
    })
    .catch(err => `Error,  ${err}`);

}


const getBeers = (fetch) => {
    fetch('https://api.punkapi.com/v2/beers/')
        .then(res => {
            if(!res.ok) {
              throw Error(res.statusText)
            } return res.json()
          })
        .then(data => { beers.push(data);
            console.log(beers);
            displayBeer();
        })
        .catch(err => document.getElementById("text").innerHTML= `Error,  ${err}`);

}

const displayBeer = () => {
    let imgText = "";
    let textText = "";
    for (let i = 0;i<beers[0].length;i++){
        let beerImg = beers[0][i].image_url;
        console.log(beerImg);
        imgText += `<div style="width:50%;display:inline-block;" ><div style="float:left;display:inline-block;"><img src="${beerImg}" style="width:50px;"></div>
                            <div>${beers[0][i].name}<br/>
                          ${beers[0][i].description}<br/>
                          ${beers[0][i].tagline}</div></div>`;
    }
   // document.getElementById("img").innerHTML = imgText;
}

describe('getBeers', () => {
    it('fetches API data', () => {
        const fakeFetch = url => {
            assert(url==='https://api.punkapi.com/v2/beers/')
            return new Promise(function(resolve) {

        })
        }
        
       getBeers(fakeFetch);
    }),


    it('mistyped address', () => {
        const fakeFetch = url => {
            assert(url="himom")
            return new Promise(function(resolve) {
                 
            })
        }
        getBeers(fakeFetch)
    })
      it('catches out of range', () => {
            const fakeFetch = url => {
                assert(url='https://api.punkapi.com/v2/beers?page=99&per_page=80.com/v2/beers/')
                return new Promise(function(resolve) {
    
            })
            }
            
           getBeers(fakeFetch);
    })

    
    })

  






