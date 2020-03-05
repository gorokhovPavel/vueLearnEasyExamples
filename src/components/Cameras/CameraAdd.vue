<template>
    <div class=''>
        <div class='form_add pointer'>
            <input type="text" value="" :placeholder='$lang.messages.nameOfCamera'/>
            <br/>
            <input type="text" value="" :placeholder='$lang.messages.descOfCamera' />
            <br/>
            <input type="text" value="" :placeholder='$lang.messages.urlOfCamera' />
            <br/>
            <a-button type='button'>{{$lang.messages.addCamera}}</a-button>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang='scss'>
    @import "../../content/style/mainStyle.scss";
    .form_add {
        padding: 20px;
        line-height: 70px !important;
        height : auto !important;
    }
    .form_add input[type="text"], .form_add select {
        width: 90%;
        border: 0;
        border-bottom: 2px solid $kpmgColor;
        padding: 8px 16px;	
    }
    .form_add input[type="button"] {
        border: 0;
        background: #255bb9;
        color: #fff;
        padding: 10px;
        font-weight: bold;
        font-size: 12px;
    }
    .form_add input[type="button"]:hover {
        background: $kpmgColor;
        cursor: pointer;
    }
</style>