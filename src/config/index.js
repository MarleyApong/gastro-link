let config = {}
const ENV = 'dev'

if (ENV === 'dev') {
   config = {
      serverUrl: "http://localhost:8000",
      frontUrl: "http://localhost:5173"
   }
}
else {
   config = {
      serverUrl: "https://api-v2.gastrolink-resto.com",
      frontUrl: "https://gastrolink-resto.com",
   }
}

export default config