import React from 'react'
import "../components/estaticos/Estilos.css";

const Gallery = () => {
    const images = [
        "https://media.istockphoto.com/id/1473825736/es/vector/dise%C3%B1o-de-envases-de-alimentos-para-perros-vector-de-ilustraci%C3%B3n.jpg?s=612x612&w=0&k=20&c=HN_MrgAuXTEkPi8Oph0e0eGJ1vApYNDUpZJtrYBuuMc=",
        "https://www.petfoodprocessing.net/ext/resources/Articles/2024/05%20May/050324_Siegwerk-recyclable-packaging_Lead.jpg?height=635&t=1714738369&width=1200",
        "https://www.sesaplastik.com.tr/afis/folded-bottom-1-1-2651.jpg",
        "https://i.pinimg.com/564x/7e/e5/ab/7ee5ab764a1b7c415e62b40a46a48418.jpg",
        "https://www.packagingseller.com/wp-content/uploads/edd/2024/08/Dog-Food-Bag-Design-Template-PS337-1-999x999.jpg"
    ];

  return (
    <section>
         <div className="gallery-container">
      <div className="gallery-track">
        {
            images.map((src,index)=>(
                <img key={index} src={src} alt={'imagen${index+1}'} className="gallery-image"/>
            ))
        }
         </div>
      </div>
    </section>
  )
}

export default Gallery