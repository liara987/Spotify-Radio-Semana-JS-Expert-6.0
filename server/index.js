import config from "./config.js";
import server from "./server.js";

server.listen(config.port)
.on('listening', () => console.log(`server running at ${config.port}`))

