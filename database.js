const mysql = require('mysql2')
const credentials = require('./credentials.json')

const database = module.exports

//const connection = mysql.createConnection(credentials['DATABASE'])

database.alive = true

database.query = function (query, placeholders, callback) {
    /*if (!database.alive)
        return
    connection.query(query, placeholders, callback)*/
const text = `
**A**

**B I L L**

**T O**

**Make provision regarding railways and for connected purposes.**

*BE IT ENACTED by the Queen’s most Excellent Majesty, by and with the advice and consent of the Lords Temporal, and Commons, in this present Parliament assembled, and by the authority of the same, as follows:—*

### PART 1. BRITISH RAILWAYS BOARD

#### *Establishment, assets, liabilities, and structure.*

**1 British Railways Board established**

(1) The British Railways Board is established.

(2) The British Railways Board is to be a body corporate.

(3) In this Act, “British Rail” means the British Railways Board.

**2 Previous railway operators etc.**

(1) The assets and liabilities held by National Rail and Network Rail are transferred to British Rail.

(2) Part 2 makes further provision regarding National Rail.

(3) Part 3 makes further provision regarding Network Rail.

**3 Terms and conditions of employment, remuneration, and pensions**

(1) The employees of British Rail who are not executive members shall be appointed to and hold their employments on such terms and conditions, including terms and conditions as to remuneration, as British Rail may determine.

(2) If British Rail so determine in the case of any of the employees of British Rail who are not executive members, British Rail shall—

> (a) pay to or in respect of those employees such pensions, allowances or gratuities, or

> (b) provide and maintain for them such pension schemes (whether contributory or not), as British Rail may determine.

(3) If any employee of British Rail—

> (a) is a participant in any pension scheme applicable to their employment, and

> (b) becomes an executive member or a non-executive member of British Rail,

they may, if the Secretary of State so determines, be treated for the purposes of the pension scheme as if their service as a member of British Rail were service as an employee of British Rail.`
    callback(null, [{id: 'B001', title: 'Railways Bill', stage: 'second_reading', text: text, last_is_submitted: false }])
}

database.end = function () {
    database.alive = false
    connection.end()
}
