import FilmRow from "../../components/Slick/FilmRow";
import HomeCarousel from "./HomeCarousel/HomeCarousel";

export default function Home() {
  return (
    <div className=''>
      <HomeCarousel />

      <section id='MultipleRow' className="text-gray-600 body-font bg-gray-950">
        <div className="mx-auto px-36 py-24 ">
          <FilmRow />
        </div>
      </section>
    </div>
  )
}
