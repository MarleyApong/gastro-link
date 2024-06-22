let config = {}
const ENV = 'prod'

if (ENV === 'dev') {
   config = {
      serverUrl: "http://localhost:8000",
      frontUrl: "http://localhost:5174"
   }
}
else {
   config = {
      serverUrl: "https://api-v1.gastrolink-resto.com",
      frontUrl: "https://gastrolink-resto.com",
   }
}

export default config