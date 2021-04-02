# Local aggrid

This builds on the project by making a rest call to a local server that returns values that are
inserted into a grid. This is a good getting started example for a end-to-end
web application.

## Server

go run main.go

## Client

Change into client dir

```
cd client
```

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

### Usage 

This is the code that makes a simple REST call from the client.

```
submit: function () {
axios
    .post(this.endpoint, this.request)
    .then(response => {
    this.rowData = response.data
    console.log(response.data)
    })
    .catch(function (error) {
    console.log(error)
    })
}
```

### Reference

https://github.com/ag-grid/ag-grid-vue-example
