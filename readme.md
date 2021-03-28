## Starbound - Redshift
Users can run this as background service while playing Starbound. It will watch the 'starbound.log' file for special REDSHIFT_EVENT type events to be outputted via sb.logInfo, and it will attempt to handle every event it hears by making a POST request to an API defined in the .env file. You can basically use in-game Starbound actions to do things outside of the game without any limitations.

![CI](https://github.com/loxodon/starbound-redshift/actions/workflows/ci.yml/badge.svg)


## Prerequisites
* Install Yarn


## Quick Start
* Clone this repo.
* Rename '.env.example' to be '.env' and customize it with your own settings.
* Run command: ```yarn install```
* Run command: ```yarn build```
* Run command: ```yarn start```
* Leave the process running in the terminal and while playing Starbound.


## How it works
When a Redshift Event is logged to the Starbound.log file, then it is detected and handled by this service. This service expects an event to follow the below format:

REDSHIFT_EVENT::<event_name>::<event_args>

Ex. REDSHIFT_EVENT::add_actor::{"name": "locuturus", "gender": "male", "species": "novakid"}

REDSHIFT_EVENT events are forwarded to an API endpoint that you specify - along with an API key as X-API-KEY header request. They are sent via a POST request to <API_URL>/record as a request body with a schema like the following:

```JSON
{
  "eventName" : "SWITCHED_POSITION",
  "eventArgs" : { 
    "actors": [
      {
        "name" : "test_subject",
        "uniqueId" : "abcd4321.."
      },
      {
        "name" : "test_subject",
        "uniqueId" : "abcd1234.."
      }
    ]
  }
}
```


### IFTTT Webhook Compatible

Please rename the .env.ifttt file to .env to get started. Replace the Webhook Key with your webhook key from IFTTT.


## Use Cases
1. A Player interacts with a button in-game which toggles off a light in real-life.
2. A Player collects an item or achievement and the server op wants to keep a record in a separate database.
3. A Player uses a custom UI to send recorded redshift events to intermediary AWS Lambda API.