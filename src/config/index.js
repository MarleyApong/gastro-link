let config = {}
const ENV = 'dev'

if (ENV === 'dev') {
   config = {
      serverUrl: "http://localhost:8000",
      frontUrl: "https://amazing-pike.212-227-211-20.plesk.page"
   }
}
else {
   config = {
      serverUrl: "https://magical-galileo.212-227-211-20.plesk.page",
      frontUrl: "https://amazing-pike.212-227-211-20.plesk.page"
   }
}


export default config