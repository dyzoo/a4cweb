import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Georville Marcus",
      role: "Donor since 2024",
      content: "Seeing the impact of my donations through regular updates keeps me motivated to give more. This charity truly makes every dollar count.",
      avatar: "/Smiley.jpg"
    },
    {
      id: 2,
      name: "Hassan Mohamed",
      role: "Volunteer",
      content: "Volunteering with this organization has been life-changing. The transparency and dedication of the team is unmatched.",
      avatar: "/Smiley.jpg"
    },
    {
      id: 3,
      name: "Mama Jackson",
      role: "Beneficiary",
      content: "Hakika mnafanya kazi nzuri sana kwenye jamii, tunashukuru kwa mnavyojitoa kwaajili ya watoto wetu, Mungu azidi kuwainua.",
      avatar: "/Smiley.jpg"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 mx-auto px-4 w-full">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-gray-900">Stories of Impact</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto dark:text-gray-900">
            Hear from those who have been touched by our work.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h4 className="font-semibold dark:text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-900">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground dark:text-gray-900">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}