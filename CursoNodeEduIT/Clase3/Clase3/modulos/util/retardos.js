const retardoSync = () => { for(let i=0; i<2e9; i++); }

const retardoCb = cb => setTimeout(cb,3000)

const retardoPromise = () => new Promise(resolve => setTimeout(resolve,3000))

module.exports = {
    retardoSync,
    retardoCb,
    retardoPromise
}