let config = {}
const ENV = 'prod'

if (ENV === 'dev') {
   config = {
      serverUrl: "http://localhost:8000",
      frontUrl: "http://localhost:5173"
   }
}
else {
   config = {
      serverUrl: "http://localhost:5500",
      frontUrl: "http://gastrolink-resto.com/",
   }
}

export default config