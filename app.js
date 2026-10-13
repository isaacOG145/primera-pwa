if('serviceWorker' in navigator){
    console.log('SW disponible');
    navigator.serviceWorker.register('./sw.js');
}else{
    console.log('Sw no disponible');
}