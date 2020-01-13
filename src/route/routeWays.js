import Vue from 'vue'
import Router from 'vue-router'

import MainMap from '../components/Map/MainMap'
import Menu from '../components/Menu'

import AnaliticsMain from '../components/Analitics/AnaliticsMain'
import AnaliticsObjects from '../components/Analitics/AnaliticsObjects'
import AnaliticsReports from '../components/Analitics/AnaliticsReports'

import CamerasAll from '../components/Cameras/CamerasAll'
import CamerasReid from '../components/Cameras/CamerasReid'
import CamerasList from '../components/Cameras/CamerasList'
import CameraVideo from '../components/Cameras/CameraVideo'
import CameraAdd from '../components/Cameras/CameraAdd'

import SettingsAttenLeft from '../components/Settings/SettingsAttenLeft'
import SettingsFloor from '../components/Settings/SettingsFloor'

Vue.use(Router);

const router = new Router({
    routes:[
        {
            path : '/',
            name : 'Menu',
            component : Menu
        },
        {
            path : '/MapFilters',
            name : 'Map',
            component : MainMap
        },
        {
            path : '/AnaliticsMain',
            name : 'AnaliticsMain',
            component : AnaliticsMain
        },
        {
            path : '/AnaliticsObjects',
            name : 'AnaliticsObjects',
            component : AnaliticsObjects
        },
        {
            path : '/AnaliticsReports',
            name : 'AnaliticsReports',
            component : AnaliticsReports
        },
        {
            path : '/CamerasAll',
            name : 'CamerasAll',
            component : CamerasAll
        },
        {
            path : '/CameraVideo/:Id',
            name : 'CameraVideo',
            component : CameraVideo
        },
        {
            path : '/CameraAdd',
            name : 'CameraAdd',
            component : CameraAdd 
        },
        {
            path : '/CamerasReid',
            name : 'CamerasReid',
            component : CamerasReid
        },
        {
            path : '/CamerasList/:IsSet',
            name : 'CamerasList',
            component : CamerasList
        },
        {
            path : '/SettingsAttenLeft',
            name : 'SettingsAttenLeft',
            component : SettingsAttenLeft
        },
        {
            path : '/SettingsFloor',
            name : 'SettingsFloor',
            component : SettingsFloor
        },
    ]
});

export default router;