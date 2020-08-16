const sync = () => { for(let i=0; i<2e9; i++); }

const cb = cb => setTimeout(cb,3000)

const promise = () => new Promise(resolve => setTimeout(resolve,3000))

module.exports = {
    sync,
    cb,
    promise
}