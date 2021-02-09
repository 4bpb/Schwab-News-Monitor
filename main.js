var fetch = require('node-fetch');





function getNews(){
    fetch('https://m.schwab.com/retail/api/research/markets/news/?', {
        headers: {
            'Host': 'm.schwab.com',
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': 'SchwabMobile/11.1.0.62 (iOS 14.4; iPhone10,6; en-US)',
            'Accept-Language': 'en-US',
            'Cookie': ''
        }
    }) 
    .then(res => res.json())
    .then(json => {

        let set = new Set()
        let docid = [...set]
        for(x=0; x<json.MarketsNewsOutput.Stories.length;x++){
            docid.push(json.MarketsNewsOutput.Stories[x].DocumentID)

        }
        console.log('Current News list: '+json.MarketsNewsOutput.Stories.length)
        monitor(docid)
    })
    
    
}

function monitor(docid){

    fetch('https://m.schwab.com/retail/api/research/markets/news/?', {
        headers: {
            'Host': 'm.schwab.com',
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': 'SchwabMobile/11.1.0.62 (iOS 14.4; iPhone10,6; en-US)',
            'Accept-Language': 'en-US',
            'Cookie': ''
        }
    }) 
    .then(res => res.json())
    .then(json => {

        let set = new Set()
        let newdocid = [...set]
        for(y=0; y<json.MarketsNewsOutput.Stories.length;y++){
            newdocid.push(json.MarketsNewsOutput.Stories[y].DocumentID)

        }
        let z = 0
        while(z < json.MarketsNewsOutput.Stories.length ){
            if(docid.indexOf(newdocid[z])===-1){
                console.log('New story : https://client.schwab.com/secure/cc/research/markets/markets.html?path=/research/Client/Markets/NewsStory&docid='+newdocid[z])
                docid.push(newdocid[z])
            } 
            z++
            if(z===json.MarketsNewsOutput.Stories.length){
                monitor(docid)
            }
        }

    })

}




getNews()



