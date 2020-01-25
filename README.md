# Test technique Georges.tech

## Lien de la collection Postman 
https://raw.githubusercontent.com/nicolascoutureau/Georges/master/Promocodes%20-%20Nicolas%20Coutureau.postman_collection.json?token=ABJS2GRWP7ZO4GM3Q5RVOQK6FRHK6

## Lien Heroku 
https://georges-nicolas.herokuapp.com/api/status

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
