const request =require('postman-request')

const forcast=(latitude,longitude,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=fb402bbfe28d8a475253ebc0227dcab5&query='+latitude+','+longitude+'&units=m'
    request({url:url,json:true},(error,response)=>
    {
        if(error)
          callback('cannot find network to search',undefined)
        else if(response.body.current.error)
          callback('cannot find postion from the input',undefined)
        else 
           callback(undefined, response.body.current.temperature + ' degress out. There is a ' + response.body.current.feelslike + '% chance of rain.')
    })
}

module.exports=forcast