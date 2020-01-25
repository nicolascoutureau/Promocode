# Test technique Georges.tech

## Structure d'un promocode :
```json
{
    "_id": "5e2c3aad9bb3cef7ae4556d7",
    "name": "WeatherCode",
    "avantage": {
        "_id": "5e2c3aad9bb3cef7ae4556d8",
        "percent": 20
    },
    "restrictions": [
        {
            "type": "reducer",
            "operator": "||",
            "rules": [
                {
                    "type": "rule",
                    "field": "age",
                    "comparator": "==",
                    "value": 40,
                    "valueType": "number"
                },
                {
                    "type": "reducer",
                    "operator": "&&",
                    "rules": [
                        {
                            "type": "rule",
                            "field": "age",
                            "comparator": "<",
                            "value": 30,
                            "valueType": "number"
                        },
                        {
                            "type": "rule",
                            "field": "age",
                            "comparator": ">",
                            "value": 15,
                            "valueType": "number"
                        }
                    ]
                }
            ]
        },
        {
            "type": "reducer",
            "operator": "&&",
            "rules": [
                {
                    "type": "rule",
                    "field": "date",
                    "comparator": ">",
                    "value": "2019-01-01",
                    "valueType": "date"
                },
                {
                    "type": "rule",
                    "field": "date",
                    "comparator": "<",
                    "value": "2020-06-30",
                    "valueType": "date"
                }
            ]
        },
        {
            "type": "reducer",
            "operator": "&&",
            "rules": [
                {
                    "type": "rule",
                    "field": "meteoIs",
                    "comparator": "==",
                    "value": "clear",
                    "valueType": "date"
                },
                {
                    "type": "rule",
                    "field": "meteoTemp",
                    "comparator": ">",
                    "value": 15,
                    "valueType": "number"
                }
            ]
        }
    ]
}
```
## Collection Postman à la racine

## Lien Heroku 
https://georges-nicolas.herokuapp.com/api/status
