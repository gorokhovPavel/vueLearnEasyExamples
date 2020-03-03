import axios from 'axios'

const [ hostSimpleApi, hostRecogApi ] = ( process.env.NODE_ENV === 'development' ) ? 
    //['http://localhost:5000', 'http://localhost:8000'] : 
    [ 'http://rustpapp601.ru.kworld.kpmg.com:9910', 'http://rustpapp601.ru.kworld.kpmg.com:9920' ] :
    [ 'http://rustpapp601.ru.kworld.kpmg.com:9910', 'http://rustpapp601.ru.kworld.kpmg.com:9920' ];

export default {
    //Тянем инфу обо всех объетках на карте
    postAreaData : bodyAreaTime => 
        axios.post(`${hostSimpleApi}/area`, bodyAreaTime ),
    //Добавляем новый объект
    postAddObjToMap : (objName, bodyPointData) =>
        axios.post(`${hostSimpleApi}/${objName}`, bodyPointData ),
    //Удаляем объект
    deleteObjFromMap : (objName, bodyPointData) =>
        axios.post(`${hostSimpleApi}/${objName}`, bodyPointData ),
    //Грузим отчеты
    postCreateReport : (nameForTypeApi, bodyPointReport) => 
        axios.post(`${hostSimpleApi}/get_xls_${nameForTypeApi}`, bodyPointReport ),
    getResultReport : (nameForTypeApi) => {
        axios({
            url: `${hostSimpleApi}/download_xls/${nameForTypeApi}`,
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
    },
    getResultRecognitions : file => {
        // const formData = new FormData();
        // formData.append( 'image', file );
        return axios.post( `${hostRecogApi}/request`, file, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    }
}