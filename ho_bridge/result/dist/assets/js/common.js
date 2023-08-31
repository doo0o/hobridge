// class Util{
//     constructor(){

//     }

//     eventBinding
// }


let _event = {
    scroll : (callback) => {
        window.addEventListener('click', callback);
    },
    click : (target, callback) => {
        target.addEventListener('click', callback);
    }
}

_event.scroll(test);

function test(){
    console.log('test')
}