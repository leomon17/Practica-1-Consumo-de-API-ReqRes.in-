//console.log("HOLA MUNDO DESDE EL SW!!");
self.addEventListener('install',(event)=>{
    console.log("SW: Instalado");
    /*
    const myPromise = new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log('Instalaciones finalizadas');
            resolve('ok')
        },3000);
    });
    event.waitUntil(myPromise)*/
});

self.addEventListener('activate', (event)=>{
    console.log("SW: Activado");
});

self.addEventListener('fetch', (event)=>{
    console.log(event.request.url);
    fetch(event.request.url).then((resp) => {
        console.log(resp);
        if (resp.ok) {
            event.respondWith(resp);
        } else {
            console.log("generico");
            const generic = fetch("images/imagen2.jpg");
            event.respondWith(generic);
        }
        //event.respondWith(resp.ok?resp:fetch('images/imagen2.jpg'))
    }).catch((err) =>{
        console.log(err);
    });

    const resp = fetch(event.request.url);
    console.log(resp);
    event.respondWith(resp);

    
    if (event.request.url.includes('style.css')) {
        const respuesta = new Response(
            `body{
                color:red;
                background-color:#000;
            }`,
            {
                headers:{
                    'Content-Type':'text/css'
                }
            }
        )
        event.respondWith(respuesta);
    }

    if (event.request.url.includes('imagen1.jpg')) {
        const respuesta = fetch("images/imagen2.jpg");
        event.respondWith(respuesta);
    }
});


    
   
