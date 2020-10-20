const express = require('express')
const exphbs = require('express-handlebars')

require('./config/mongoose.js')
const router = require('./routes')
const helpers = require('./utils/exphbs-helpers.js')

const app = express()
const PORT = 3000



app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', helpers }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(router)



app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`)
})