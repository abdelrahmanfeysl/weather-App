const request =require('postman-request')
const geocoding=(address,callback)=>
{
  
   const mapurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoiYWJkZWxyYWhtYW4tZmV5c2wxIiwiYSI6ImNrbDAxMDNyMTAzZmwzMG80bHR4emg3NDQifQ.lF4qDSr0wFmn-xhvm-1pgA&limit=1'
   request({url:mapurl,json:true},(error,response)=>{
       if(error)
   {
       callback('cannot find network to search',undefined)
   }
   else if(response.body.features.length==0)
      { callback('cannot find postion to search',undefined)}
   else
       {callback(undefined,{
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
       })}
   })
   
}
module.exports=geocoding