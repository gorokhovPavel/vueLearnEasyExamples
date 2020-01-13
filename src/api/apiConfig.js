import axios from 'axios'

const host = ( process.env.NODE_ENV === 'development' ) ? 
    'http://localhost:5000' : 
    //'http://rustpapp601.ru.kworld.kpmg.com:9910' :
    'http://rustpapp601.ru.kworld.kpmg.com:9910';

export default {
    //Тянем инфу обо всех объетках на карте
    postAreaData : bodyAreaTime => 
        axios.post(`${host}/area`, bodyAreaTime ),
    //Добавляем новый объект
    postAddObjToMap : (objName, bodyPointData) =>
        axios.post(`${host}/${objName}`, bodyPointData ),
    //Удаляем объект
    deleteObjFromMap : (objName, bodyPointData) =>
        axios.post(`${host}/${objName}`, bodyPointData ),
    //Грузим отчеты
    postCreateReport : (nameForTypeApi, bodyPointReport) => 
        axios.post(`${host}/get_xls_${nameForTypeApi}`, bodyPointReport ),
    getResultReport : (nameForTypeApi) => {
        axios({
            url: `${host}/download_xls/${nameForTypeApi}`,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
             var fileURL = window.URL.createObjectURL(new Blob([response.data]));
             var fileLink = document.createElement('a');
             fileLink.href = fileURL;
             fileLink.setAttribute('download', `download_${nameForTypeApi}_${Date.now()}.xls`);
             document.body.appendChild(fileLink);
             fileLink.click();
        });
    }
}