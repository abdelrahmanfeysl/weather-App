console.log('Client side javascript file is loaded!')

const weather=document.querySelector('form')
const search =document.querySelector('input')
const msgone =document.querySelector('#m-one')
const msgtwo =document.querySelector('#m-two')

weather.addEventListener('submit',(e)=>
{
    msgone.textContent='loading.....'
    msgtwo.textContent='......'
    e.preventDefault()
    fetch('/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>
    {
        if(data.error)
          msgone.textContent='error : '+ data.error
        else
        {  msgone.textContent='location : '+data.location
           msgtwo.textContent='data : '+data.forecastData
        }
    })
})
})