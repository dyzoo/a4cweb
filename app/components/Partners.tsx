export default function Partners() {
  // Partner data with logo paths pointing to the public folder
  const Partners = [
    { id: 1, name: "Alnoor Foundation", logo: "/Alnoor.png", url: "https://www.unicef.org" },
    { id: 2, name: "Tanzania Government", logo: "/Coat Of Arm.png", url: "https://www.tanzania.go.tz/" },
    { id: 3, name: "Africa Relief and Community Development", logo: "/ARCD.png", url: "https://africarelief.org/" },
    { id: 4, name: "Naprint", logo: "/Naprint.png", url: "" },
    { id: 5, name: "Save the Children Tanzania", logo: "/savethechildren.png", url: "https://www.savethechildren.net/tanzania" },
    { id: 6, name: "Little Gidy", logo: "/LG Logo.png", url: "" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Trusted Partners</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Together with these organizations, we're creating lasting change for children in Tanzania.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {Partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              title={partner.name}
            >
              <img
                src={partner.logo} // this pulls from public/partners/...
                alt={`${partner.name} logo`}
                className="h-24 w-full object-contain" // fixed height of 6rem
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
