import { LOCATION_POINTS } from "../data/index";
import { getIcon } from "../utils/iconMap";

export default function Location() {
  return (
    <section id="lokasi" className="ng-section">
      <div className="ng-section-tag">Peta Lokasi</div>

      <h2 className="ng-section-title">
        Lokasi Strategis
        <br />
        <em>di Seluruh Jabodetabek</em>
      </h2>

      <div className="ng-location-grid">
        <div className="ng-map-placeholder">
          <div className="ng-map-inner">
            <div className="ng-map-pin" />
            <div className="ng-map-label">Klik untuk buka Google Maps</div>
          </div>
          <button
            className="ng-map-open-btn"
            onClick={() => window.open("https://maps.google.com", "_blank")}
          >
            Buka Maps &#8599;
          </button>
        </div>

        <div className="ng-location-info">
          <h3>
            Dekat dengan Segala
            <br />
            Kebutuhan Anda
          </h3>
          <p>
            Seluruh kawasan NusaGraha dipilih berdasarkan aksesibilitas,
            perkembangan infrastruktur, dan potensi investasi jangka panjang.
          </p>
          <ul className="ng-location-points">
            {LOCATION_POINTS.map((lp) => (
              <li key={lp.title}>
                <span className="ng-loc-icon">{getIcon(lp.icon)}</span>
                <div className="ng-loc-text">
                  <strong>{lp.title}</strong>
                  <span>{lp.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
