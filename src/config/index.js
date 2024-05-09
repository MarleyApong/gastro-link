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
      serverUrl: "http://localhost:5500",
      frontUrl: "http://localhost:3000",
   }
}

export default config