export default function MapSection() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg">
      <iframe
        src="https://maps.google.com/maps?q=Sector%2015,%20Noida,%20Uttar%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
