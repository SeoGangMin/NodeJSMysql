# NodejsMySQL
nodejs + express + mysql + ejs

## Initialize
### 1. make
```sh
mkdir logs
npm install
echo '{}' > config.json
```

## 2. register database options to config.json

```sh
{
  "DB_OPTIONS":{
    "host":"localhost"
    ,"port":3360
    ,"user":"<user>"
    ,"password":"<password>"
    ,"database":"<name>"
    ,"debug":null
    ,"connectTimeout":10000
  }
}

```
