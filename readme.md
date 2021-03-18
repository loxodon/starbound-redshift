## Starbound - Redshift
Users can run this as background service while playing Starbound. It will watch the 'starbound.log' file for special REDSHIFT_EVENT type events to be outputted, and it will attempt to handle every event it hears by making a POST request to an API defined in the .env file. You can basically use in-game Starbound actions to do things in real-life. You could probably change the vibration modes and speeds of something something.

## Prerequisites
* Install NPM

## Quick Start
* Clone this repo.
* Rename '.env.example' to be '.env' and customize it with your own settings.
* Run ```yarn install && yarn build && yarn start```within the cloned directory in terminal.
* Leave the process running in the terminal and while playing Starbound.

## How it works
When a Redshift Event is logged to the Starbound.log file, then it is detected and handled by this service. This service expects events to have the following format:

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
    ],
    "position_name" : "missionary"
  }
}
```