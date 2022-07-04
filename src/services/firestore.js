// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, getDocs, getDoc, query, where, doc, collection, setDoc, addDoc, Timestamp } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB_oWFcHcpEHX9HYDplnfuRi48uIKeataQ",
  authDomain: "coderhouse37070.firebaseapp.com",
  projectId: "coderhouse37070",
  storageBucket: "coderhouse37070.appspot.com",
  messagingSenderId: "611775867241",
  appId: "1:611775867241:web:f3ca52aa39e6ea6b9575f8"
};

//1. inicializamos la app de Firebase
const appFirebase = initializeApp(firebaseConfig);

//2. inicializamos la instancia a la base de datos de Firestore
const appFirestore = getFirestore(appFirebase);

//3. obtenemos todos los items
export async function traerProductos(){
    // A. Instanciamos una colección (appfirestore, nombre-colecccion)
    const plantCollection = collection(appFirestore, "plants");

    //B. Obtenemos los documentos con getDocs(referncia-de-la-coleccion)
    const plantsSnapshot = await getDocs(plantCollection)

    //C. Del snapshot, mapeamos los documentos
    let respuesta = plantsSnapshot.docs.map( doc => { 
        return {
            ...doc.data(),
            id: doc.id
        }
    })

   return respuesta;
}

export async function traerProductosDeCategoria(idcategory){
    /* query "where" */
    
    const plantCollection = collection(appFirestore, "plants");

    const q = query(plantCollection, where("category", "==", idcategory));

    const plantsSnapshot = await getDocs(q);

    let respuesta = plantsSnapshot.docs.map( doc => { 
        return {
            ...doc.data(),
            id: doc.id
        }
    })

    return respuesta
}

export async function traerUnProducto(itemId){
    const docref = doc(appFirestore, "plants", itemId); 

    const docSnapshot = await getDoc(docref);

    return { 
        id: docSnapshot.id, 
        ...docSnapshot.data()
    };
}   

export async function exportDataToFirestore(){
    const productos = [
        {
          id: 1,
          name: "Bessey's Locoweed",
          category: "Fabaceae",
          stock: 0,
          price: 57.38,
          img: "https://live.staticflickr.com/65535/48188567041_1a7cb2b590_b.jpg",
          description: "Oxytropis besseyi (Rydb.) Blank. var. fallax Barneby",
        },
        {
          id: 2,
          name: "Celandine",
          category: "Fabaceae",
          stock: 5,
          price: 719.21,
          img: "https://www.gardeningknowhow.com/wp-content/uploads/2015/05/greater-celadine.jpg",
          description: "Chelidonium majus L. var. laciniatum (Mill.) Syme",
        },
        {
          id: 3,
          name: "Strigula Lichen",
          category: "Fabaceae",
          stock: 6,
          price: 1556.96,
          img: "https://www.researchgate.net/publication/336421481/figure/fig1/AS:812818173546496@1570802362023/Strigula-multiformis-on-the-leaf-of-Camellia-japonica-Photograph-by-Jung-Jae-Woo.jpg",
          description: "Strigula submuriformis (R.C. Harris) R.C. Harris",
        },
        {
          id: 4,
          name: "Tropical Sensitive Pea",
          category: "Fabaceae",
          stock: 17,
          price: 1856.67,
          img: "https://content.eol.org/data/media/8f/4b/98/611.9042.jpg",
          description: "Chamaecrista absus (L.) Irwin & Barneby",
        },
        {
          id: 5,
          name: "Red Mangrove",
          category: "Pinaceae",
          stock: 16,
          price: 340.1,
          img: "https://media-cdn.tripadvisor.com/media/photo-s/07/f5/b2/64/conservation-kayak.jpg",
          description: "Rhizophora mangle L.",
        },
        {
          id: 6,
          name: "Whitewoolly Twintip",
          category: "Pinaceae",
          stock: 12,
          price: 850.03,
          img: "http://southwestdesertflora.com/WebsiteFolders/Images/Scrophulariaceae/Stemodia%20durantifolia,%20Whitewoolly%20Twintip/4255Stemodia-durantifolia,-Whitewoolly-Twintip700x465.jpg",
          description: "Stemodia durantifolia (L.) Sw.",
        },
        {
          id: 7,
          name: "Spruce",
          category: "Pinaceae",
          stock: 9,
          price: 82.13,
          img: "http://cdn.shopify.com/s/files/1/0059/8835/2052/products/White_Spruce_Tree_FGT_600x600_3b8f2baa-581d-4a29-9f38-25d68bbf5905_grande.jpg?v=1624972261",
          description: "Picea A. Dietr.",
        },
        {
          id: 8,
          name: "Queensland Raspberry",
          category: "Rosaceae",
          stock: 18,
          price: 1599.43,
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnht5L_Nsnt8vZkAXTB0DX8iomEE-KUb9W6iVKPAlMZ4Es5QVMow9muQCk1hAxihN61Ig&usqp=CAU",
          description: "Rubus probus L.H. Bailey",
        },
        {
          id: 9,
          name: "Lesser Hawkbit",
          category: "Rosaceae",
          stock: 11,
          price: 1577.73,
          img: "https://wildflowerfinder.org.uk/Flowers/H/Hawkbit(Lesser)/Hawkbit(Lesser)_2017_07_08_Waterloo_3ParkGardens_circ_410p1.jpg",
          description:
            "Leontodon taraxacoides (Vill.) Mérat ssp. longirostris Finch & Sell",
        },
        {
          id: 10,
          name: "Pale Sage",
          category: "Rosaceae",
          stock: 18,
          price: 1644.97,
          img: "https://strictlymedicinalseeds.com/wp-content/uploads/2016/11/White_sage_among_rocks_500-e1619554083404.jpg",
          description: "Salvia pallida Benth.",
        },
      ];

    const plantCollection = collection(appFirestore, "plants");
    

    productos.forEach( item => {
      const newDoc = doc(plantCollection);      
      setDoc(newDoc, item).then( res =>{
        console.log("Documento guardado:", newDoc.id )
      })  
      .catch( (error=> console.log("error obteniendo los datos: ", error))        
      )  
    })
}

export async function createBuyOrder( dataOrder ){
  const orderColectionRef = collection(appFirestore, "orders");
  const dateTimestamp = Timestamp.now();

  const dataOrderWithDate = {
    buyer: dataOrder.buyer,
    items: dataOrder.items,
    total: dataOrder.total,
    date: dateTimestamp 
  };
  console.log("--->",dataOrderWithDate);
  const orderCreated = await addDoc(orderColectionRef, dataOrderWithDate);

  // control de stock:
  // iterar cada uno de los items comprados
  // obtener cada uno de esos items de la base de datos
  // hacer un update() de cada uno de esos items
  // validar que ningun item se quede sin stock

  return orderCreated;
}

export default appFirestore

