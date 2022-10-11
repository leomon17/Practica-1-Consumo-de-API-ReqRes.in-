//console.log("HOLA MUNDO DESDE EL SW!!");
self.addEventListener('install',(event)=>{
    console.log("SW: Instalado");
});

self.addEventListener('activate', (event)=>{
    console.log("SW: Activado");
});


self.addEventListener('fetch', (event)=>{
    console.log(event.request.url);

    if(event.request.url.includes('style.css')){
        const respuesta = new Response(
            `body{
                color: white;
                background-color: #3c2348;
            }`,
            {
                headers:{
                    'Content-Type':'text/css'
                }
            }
        );
        event.respondWith(respuesta);
    }
    if(event.request.url.includes('.jpg')){
        let res = fetch('images/imagen2.jpg')
        event.respondWith(res)
    }

})
    
   
