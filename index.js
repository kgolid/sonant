// import create_transport from './main';
// import create_transport from './main-repeat';
import create_transport from './main-odd';

const transport = create_transport();

function restart() {
  stop();
  transport.start();
}

function stop() {
  transport.stop();
  transport.clear();
}

document.querySelector('#restart').addEventListener('click', _ => restart());
document.querySelector('#stop').addEventListener('click', _ => stop());
