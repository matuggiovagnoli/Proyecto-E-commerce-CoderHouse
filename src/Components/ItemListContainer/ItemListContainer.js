import React, {useState, useEffect} from 'react';
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore"
import db from '../../utils/firebase';


const ItemListContainer = () => {

  const [listaProductos, setListaProductos] = useState([]);
  const {categoryId} = useParams();
  console.log(categoryId);


  useEffect (()=>{
    const getData = async() => {
      // Referencia de las base de datos y la info que quiero obtener
      const query = collection(db, 'Productos');
      // Obtener los documentos dentro de la coleccion de Productos
      const response = await getDocs(query);
      // Creando array de objetos iterando en los documentos de la coleccion y traduciendolos con prop data
      const dataItems = response.docs.map(doc => {return{id: doc.id, ...doc.data()}})
      console.log("dataItems", dataItems)
      const getDataFilter = () => {
        if (!categoryId) {
          setListaProductos(dataItems)
        }else {
          setListaProductos (dataItems.filter((producto) => producto.categoria === categoryId))
        }
      }
      getDataFilter()

    }
    getData()
    
  },[categoryId])




  return (
    <>
    { 
      listaProductos.length === 0  ?
      <div>
        <strong className='fs-2'>Cargando</strong>
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      :
      <div>
        <ItemList lista={ listaProductos }/>
      </div>
  }
  </>
  )
}



export default ItemListContainer