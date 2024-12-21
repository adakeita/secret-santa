import "./pages.css";

const ItineraryPage = () => {
  return (
    <div className="itinerary_page pages">
      <h1 className="itinerary-heading">Christmas Eve Itinerary</h1>
      <div className="itinerary-content">
        <div className="itinerary-intro">
          <p className="itinerary-intro-p">
            Get cozy and celebrate the season with us! Here's how the day will
            unfold:
          </p>
        </div>
        <div className="kjoreplan">
          <h2 className="itinerary-category">12:00 PM - Open House</h2>
          <p className="itinerary-detail">
            The doors are open! Grab some coffee or mulled wine, and settle in
            for a day of festive fun.
          </p>
          <h2 className="itinerary-category">2:00 PM - Porridge Time</h2>
          <p className="itinerary-detail">
            Enjoy a warm bowl of porridge while competing for the ultimate
            prize: the marzipan pig. Who will find the almond?
          </p>
          <h2 className="itinerary-category">Afternoon Activities</h2>
          <p className="itinerary-detail">
            Chill out with some games (Nintendo Switch and board games) or get
            crafty with simple holiday-themed projects.
          </p>
          <h2 className="itinerary-category">5:30 PM - Dinner</h2>
          <p className="itinerary-detail">
            Gather around the table for a hearty Norwegian Christmas feast.
            Bring your appetite and good cheer!
          </p>
          <p className="itinerary-closing">
            Stay as long as you'd like—there’s no curfew on holiday joy!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPage;
