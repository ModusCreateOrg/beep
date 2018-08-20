[![Logo of the project](./images/modus.logo.svg)](https://moduscreate.com)

# Beep FileLoader for JSON flat files

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![MIT Licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

Beep FileLoader allows a user to query a JSON data structure for username or
password matches. This allows arbitrary breach data in a flat file to be queried
as long as it is stored in JSON format.

The FileLoader supports searching for a username, a cleartext password and
also hashed passwords with an optional cleartext mapping.

When a name, a hashed or clear text password match is found, a JSON object is
returned containing the match and any other data recorded about the password
e.g. hashing algorithm.


## JSON File Format

Beep FileLoader expects a flat file in JSON format. The following key:value
pairs should be used as default in the file,
however arbitrary metadata can also be added:

`{
   breachdata:[
     {"name":"value", "algo":"value","hash":"value","cleartext":"value"}
   ]
 }`


`breachdata:` takes a list of objects containing
hashed passwords e.g. "bdc87b9c894da5168059e00ebffb9077", their cleartext mapping
the hashing algorithm and the name. An example would be:  

`{
  "name": "Joe Bloggs",
  "algo":"md5",
  "hash":"bdc87b9c894da5168059e00ebffb9077",
  "cleartext":"password1234"
}`

Each value is optional, i.e. if you do not know the hashing algo you can leave
this blank, or if you only know the username, the other fields can be left blank.


## Modus Create

[Modus Create](https://moduscreate.com) is a digital product consultancy. We use a distributed team of the best talent in the world to offer a full suite of digital product design-build services; ranging from consumer facing apps, to digital migration, to agile development training, and business transformation.

[![Modus Create](./images/modus.logo.svg)](https://moduscreate.com)

## Licensing

State what the license is and how to find the text version of the license.

e.g. This project is [MIT licensed](./LICENSE).
