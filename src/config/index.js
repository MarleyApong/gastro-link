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
      serverUrl: "https://magical-galileo.212-227-211-20.plesk.page/",
      frontUrl: "https://marleyapong.github.io/customer-space-client"
   }
}


export default config