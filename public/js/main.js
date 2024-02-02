const submitBtn = document.getElementById('submitBtn')
const cityName = document.getElementById('cityName')
const city_name = document.getElementById('city_name')
const temp = document.getElementById('temp')
const tempStatus = document.getElementById('temp_status')

const datahide = document.querySelector('.middle_layer')
const getInfo = async (event) => {
    event.preventDefault()
    let cityVal = cityName.value

    if (cityVal === '') {
        city_name.innerText = `Please write the name before search`;
        datahide.classList.add('data_hide')
    }
    else {
        try {
            console.log(cityVal);
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal},IN&appid=76795dbae9ef2f0dc863fa136fa8762a`
            const res = await fetch(url)
            const data = await res.json()
            const arrData = [data]
            console.log(data);
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`
            temp.innerText = (arrData[0].main.temp / 10).toFixed(2)

            // to check sunny, cloudy
            const tempMode = arrData[0].weather[0].main
            if (tempMode == 'Clear') {
                tempStatus.innerHTML = '<i class="fa fa-sun"  style="color: #eccc68" aria-hidden="true"></i>'
            }
            else if (tempMode == 'Clouds') {
                tempStatus.innerHTML = '<i class="fa fa-cloud"  style="color: #f1f2f6" aria-hidden="true"></i>'
            }
            else if (tempMode == 'Rain') {
                tempStatus.innerHTML = '<i class="fa fa-rain"  style="color: #a4b0be" aria-hidden="true"></i>'
            }
            else {
                tempStatus.innerHTML = '<i class="fa fa-cloud"  style="color: #f1f2f6" aria-hidden="true"></i>'
            }
            cityName.value = ''
            datahide.classList.remove('data_hide')

        }
        catch {
            city_name.innerText = `Please enter correct city name`;
            datahide.classList.add('data_hide')
        }
    }
}
submitBtn.addEventListener('click', getInfo)
