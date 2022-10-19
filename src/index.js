import app from './app.js';
import { PORT } from './config.js';

app.listen(app.get('port'), async () => {
    console.log(`API Listening on port ${PORT}`)
})