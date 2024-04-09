const api = axios.create({
     baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = '4mI6qNSvS58Em12tuJWvkmmIMqThPle3C7bGed7dB3BqwCTWCRXXkbhulkw7mhJR';
const API_URL_RAMDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_4mI6qNSvS58Em12tuJWvkmmIMqThPle3C7bGed7dB3BqwCTWCRXXkbhulkw7mhJR';
const API_URL_FAVOURITES = 'https://api.thecatapi.com/v1/favourites?api_key=live_4mI6qNSvS58Em12tuJWvkmmIMqThPle3C7bGed7dB3BqwCTWCRXXkbhulkw7mhJR';
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_4mI6qNSvS58Em12tuJWvkmmIMqThPle3C7bGed7dB3BqwCTWCRXXkbhulkw7mhJR`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload?api_key=live_4mI6qNSvS58Em12tuJWvkmmIMqThPle3C7bGed7dB3BqwCTWCRXXkbhulkw7mhJR';

const spanError = document.getElementById('error')

async function loadRamdonMichis() {
   const res = await fetch(API_URL_RAMDOM);
   const data = await res.json();
        console.log('Ramdom')  
        console.log(data)
       
       if (res.status !== 200) {
          spanError.innerHTML = "hubo un error: " + res.status;
       } else {
          const img1 = document.getElementById('img1');
          const img2 = document.getElementById('img2');
          const btn1 = document.getElementById('btn1');
          const btn2 = document.getElementById('btn2');
         
          img1.src = data[0].url;
          img2.src = data[1].url;

          btn1.onclick = () => saveFavouriteMichi(data[0].id);
          btn2.onclick = () => saveFavouriteMichi(data[1].id);
       }
   
}
async function loadFavouritesMichis() {
        const res = await fetch(API_URL_FAVOURITES);
        const data = await res.json();
             console.log('Favoritos')  
             console.log(data)

             if (res.status !== 200) {
               spanError.innerHTML = "hubo un error: " + res.status + "intente mas tarde";
            } else {
               const section = document.getElementById('favouriteMichis');
               section.innerHTML = "";
               const h2 = document.createElement('h2');
               const h2Text = document.createTextNode('Gatos favoritos');
               h2.appendChild(h2Text);
               section.appendChild(h2);
               data.forEach(michi => {
               
                 const article = document.createElement('article');
                 const img = document.createElement('img');
                 const btn = document.createElement('button');
                 const btntext = document.createTextNode('Sacar de Favoritos');


                 btn.appendChild(btntext);
                 btn.onclick = () => deleteFavouriteMichi(michi.id);
                 img.src =  michi.image.url
                 img.width = 150; 
                 article.appendChild(img);
                 article.appendChild(btn);
                 section.appendChild(article);
               });
            }    
}

async function saveFavouriteMichi(id) {
    // const {data, status } = await api.post('/favourites', {
      //    image_id: id,
     // });
     
          const res = await fetch(API_URL_FAVOURITES, {
               method: 'POST',
              headers: {
                   'Content-Type': 'application/json',
               },
              body: JSON.stringify({
                image_id: id
               }),
          });
          const data = await res.json();
          console.log(res)
          console.log('save')
          if (res.status !== 200) {
               spanError.innerHTML = "hubo un error: " + res.status;
            } else {
               console.log('Quedo guardado en favoritos')
               loadFavouritesMichis();
            }
}
async function deleteFavouriteMichi(id) {
     const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
          method: 'DELETE',
     });
     const data = await res.json();

     if (res.status !== 200) {
          spanError.innerHTML = "hubo un error: " + res.status;
       } else {
          console.log('Quedo eliminado de favoritos')
          loadFavouritesMichis();
       }
}
async function uploadMichiPhoto() {
     const form =document.getElementById('uploadingForm')
     const formData = new FormData(form);

     console.log(formData.get('file'))

     const res = await fetch(API_URL_UPLOAD, {
          method: 'POST',
          headers: {
              // 'Content-Type': 'multipart/form-data',
          },
          body: formData,
     })
     const data = await res.json();
     if (res.status !== 201) {
          spanError.innerHTML = "hubo un error: " + res.status;
       } else {
          console.log('Subio correctamente la foto')
          console.log({data})
            console.log(data.url)
            saveFavouriteMichi(data.id);
           // loadFavouritesMichis()
       }

}
  
loadRamdonMichis();
loadFavouritesMichis();