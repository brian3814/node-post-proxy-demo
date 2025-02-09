### Usage

To start up both server, run:

```
npm run start
```

Proxy server will run on port 3000 and main server will run on port 3001.

A sample POST request to send to the proxy server, run:

```
curl -X POST http://localhost:3000/api/data -H "Content-Type: application/json" -d '{"message": "Hello, world!"}'
```


