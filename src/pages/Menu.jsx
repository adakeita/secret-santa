import "./pages.css";

const MenuPage = () => {
  return (
    <div className="menu_page pages">
      <h1 className="menu-heading">Festive Feast Menu</h1>
      <div className="menu-content">
        <p className="menu-intro">
          Gather around for some traditional Norwegian Christmas munch!
          <br />
           Here's what's cooking:
        </p>

        <section className="menu-wrapper">
          <div className="lunch">
            <h2 className="menu-category">Lunch at 14:00</h2>
            <p>
              <strong>Porridge:</strong> Warm, creamy porridge served with a
              sprinkle of sugar and cinnamon. Don’t forget to hunt for the
              hidden almond to win the legendary marzipan pig!
            </p>
          </div>

          <div className="dinner">
            <h2 className="menu-category">Main Dishes at 17:30</h2>
            <ul className="menu-list">
              <li>
                <strong>Pinnekjøtt:</strong> Tender lamb ribs with creamy
                kålrabi mash and boiled potatoes.
              </li>
              <li>
                <strong>Ribbe:</strong> Crispy pork belly with julepølse
                (Christmas sausage), medisterkaker (meat patties), and a hearty
                helping of surkål/rødkål (sauerkraut/red cabbage) with a sauce.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MenuPage;
