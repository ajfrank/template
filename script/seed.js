/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Group} = require('../server/db/models')
const Promise = require('bluebird')
const faker = require('faker')
const numUsers = 100
const numGroups = 10

function doTimes (n, fn) {
  const results = []
  while (n--) results.push(fn(n))
  return results
}

function randUser (n) {
  return User.build({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: '123'
  })
}

function randGroup (n) {
  return Group.build({
    name: faker.lorem.words()
  })
}

function generateUsers () {
  return doTimes(numUsers, randUser)
}

function generateGroups () {
  return doTimes(numGroups, randGroup)
}

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.map(generateUsers(), user => user.save())
  const groups = await Promise.map(generateGroups(), group => group.save())

  await Promise.all([users.map(user => user.update({groupId: Math.floor(Math.random() * 10) + 1}))]).then(() => {
    // Wowzers! We can even `await` on the right-hand side of the assignment operator
    // and store the result that the promise resolves to in a variable! This is nice!
    console.log(`seeded ${users.length} users`)
    console.log(`seeded ${groups.length} groups`)
    console.log(`seeded successfully`)
  })
    .catch(err => console.log(err))
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
