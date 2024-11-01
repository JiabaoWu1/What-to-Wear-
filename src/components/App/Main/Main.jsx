import WeatherCard from "./WeatherCard/WeatherCard";

function Main() {
  return (
    <main>
      <WeatherCard />;
      <section className="cards">
        <p className="cards__text">Today is 75° F / You may want to wear:</p>
      </section>
    </main>
  );
}

export default Main;
